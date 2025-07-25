// src/components/MainSection.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function MainSection() {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const { t } = useLanguage();

  // 현재 위치 정보 관련 상태
  const [currentAddress, setCurrentAddress] = useState(t('fetching_location'));
  const [currentLocationCoords, setCurrentLocationCoords] = useState(null); // 현재 위치 좌표 저장
  const [locationStatus, setLocationStatus] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true); // 현재 위치 로딩 상태

  // 입력 주소 정보 관련 상태
  const [inputAddress, setInputAddress] = useState(''); // 사용자가 입력할 주소
  const [inputAddressStatus, setInputAddressStatus] = useState(''); // 입력 주소 인증 상태
  const [loadingInputAddress, setLoadingInputAddress] = useState(false); // 입력 주소 로딩 상태

  // 지오코더 인스턴스 (API 사용량 최소화를 위해 한 번만 생성)
  const geocoder = useRef(null);

  // 마커를 지도에 표시하고 이동시키는 함수 (useCallback으로 최적화)
  const displayMarker = useCallback((locPosition) => {
    if (markerInstance.current) {
      markerInstance.current.setPosition(locPosition);
    } else {
      markerInstance.current = new window.kakao.maps.Marker({
        map: mapInstance.current,
        position: locPosition,
      });
    }
    mapInstance.current.setCenter(locPosition);
  }, []); // 의존성 없음

  // 지도 초기화 함수 (useCallback으로 최적화)
  const initializeMap = useCallback(() => {
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 기본 중심 (서울 시청)
      level: 3,
    };
    mapInstance.current = new window.kakao.maps.Map(mapContainer.current, options);
    geocoder.current = new window.kakao.maps.services.Geocoder(); // 지오코더 인스턴스 초기화

    setLoadingLocation(false); // 지도 초기화 완료

    // 지도 클릭 시 마커 이동 및 주소 표시 (기존 기능 유지)
    window.kakao.maps.event.addListener(mapInstance.current, 'click', function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      displayMarker(latlng);
      setCurrentLocationCoords({ lat: latlng.getLat(), lng: latlng.getLng() }); // 클릭한 위치 좌표 저장

      geocoder.current.coord2Address(latlng.getLng(), latlng.getLat(), function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const detailAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
          setCurrentAddress(detailAddr || result[0].address.address_name);
          setLocationStatus(t('location_selected'));
        } else {
          setCurrentAddress(t('address_not_found'));
          setLocationStatus(t('address_not_found_desc'));
        }
      });
    });
  }, [displayMarker, t]); // displayMarker와 t가 변경될 때만 initializeMap 재생성

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6773419185d52f8e585484fdab78414c&libraries=services`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };
      script.onerror = () => {
        console.error('카카오 지도 API 로드 실패');
        setLoadingLocation(false);
        setLocationStatus(t('map_load_failed'));
      };
      document.head.appendChild(script);
    }
  }, [initializeMap, t]); // initializeMap과 t가 변경될 때만 실행

  // 현재 위치 가져오기 및 지도에 표시
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      setLocationStatus(t('getting_current_location'));
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude; // long -> lng 일관성 유지
          const locPosition = new window.kakao.maps.LatLng(lat, lng);

          displayMarker(locPosition);
          setCurrentLocationCoords({ lat: lat, lng: lng }); // 현재 위치 좌표 저장

          geocoder.current.coord2Address(lng, lat, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const detailAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
              setCurrentAddress(detailAddr || result[0].address.address_name);
              setLocationStatus(t('current_location_found'));
            } else {
              setCurrentAddress(t('address_not_found'));
              setLocationStatus(t('address_not_found_desc'));
            }
            setLoadingLocation(false);
          });
        },
        (error) => {
          console.error('위치 정보 가져오기 실패:', error);
          let errorMessage = t('location_permission_denied');
          if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = t('location_unavailable');
          } else if (error.code === error.TIMEOUT) {
            errorMessage = t('location_timeout');
          }
          setLocationStatus(errorMessage);
          setCurrentAddress(t('location_error'));
          setLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocationStatus(t('geolocation_not_supported'));
      setCurrentAddress(t('geolocation_not_supported_desc'));
      setLoadingLocation(false);
    }
  };

  const handleLocationCertification = () => {
    if (currentAddress && currentLocationCoords && currentAddress !== t('fetching_location') && currentAddress !== t('location_error')) {
      alert(`${t('location_certified_prefix')}: ${currentAddress}`);
      // 여기에 서버로 위치 정보 전송 등의 추가 로직 구현
    } else {
      alert(t('please_get_location_first'));
    }
  };

  // 두 지점 간의 거리 계산 함수 (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
  };

  // 입력 주소 인증 및 비교 함수
  const handleInputAddressCertification = () => {
    if (!inputAddress.trim()) {
      setInputAddressStatus(t('please_enter_address'));
      return;
    }
    if (!currentLocationCoords) {
      setInputAddressStatus(t('please_get_location_first_for_compare'));
      return;
    }

    setLoadingInputAddress(true);
    setInputAddressStatus(t('comparing_addresses'));

    // 입력 주소를 좌표로 변환
    geocoder.current.addressSearch(inputAddress, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const inputLat = parseFloat(result[0].y); // y: 위도
        const inputLng = parseFloat(result[0].x); // x: 경도

        // 현재 위치와 입력 주소의 거리 계산
        const distance = calculateDistance(
          currentLocationCoords.lat, currentLocationCoords.lng,
          inputLat, inputLng
        );
        const threshold = 100; // 100미터 이내를 동일하다고 간주하는 임계값

        if (distance <= threshold) {
          setInputAddressStatus(`${t('address_match_success')} (${t('distance_within')} ${distance.toFixed(2)}m)`);
          alert(`${t('address_match_success_alert')} (${t('current_address')}: ${currentAddress}, ${t('input_address')}: ${result[0].address_name})`);
        } else {
          setInputAddressStatus(`${t('address_match_fail')} (${t('distance_is')} ${distance.toFixed(2)}m)`);
          alert(`${t('address_match_fail_alert')} (${t('current_address')}: ${currentAddress}, ${t('input_address')}: ${result[0].address_name})`);
        }
      } else {
        setInputAddressStatus(t('address_not_found_input'));
      }
      setLoadingInputAddress(false);
    });
  };

  return (
    <main className="flex-grow max-w-[1200px] mx-auto box-border overflow-y-auto
                  pt-header-h
                "
    >
      <section
        // .map-section
        className="bg-white p-[30px] rounded-lg shadow-md mb-10 text-center
                   mobile-max:p-5 // 미디어 쿼리 적용
                  "
      >
        <h2
          // .map-section h2
          className="text-gray-900 mb-[15px] text-2xl 
                     mobile-max:text-24 // 미디어 쿼리 적용 (config에 24px 있음)
                    "
        >
          {t('location_certification')}
        </h2>
        <p
          // .map-section p
          className="text-gray-700 text-base leading-relaxed mb-[25px]"
        >
          {t('map_desc')}
        </p>
        <div
          // .map-controls
          className="mb-5
                    "
        >
          <button
            onClick={getCurrentLocation}
            disabled={loadingLocation}
            // .map-controls button
            className="bg-brand-primary text-white border-none py-[12px] px-[25px] rounded-md text-base cursor-pointer mx-[10px] transition-colors duration-300
                       hover:bg-new-blue disabled:bg-gray-400 disabled:cursor-not-allowed
                       mobile-max:mx-[5px] mobile-max:w-[calc(100%-10px)] // 20px gap + 10px from mx (total 20px)
                      "
          >
            {loadingLocation ? t('loading') : t('get_my_location')}
          </button>
          <button
            onClick={handleLocationCertification}
            disabled={!currentLocationCoords || loadingLocation}
            className="bg-brand-primary text-white border-none py-[12px] px-[25px] rounded-md text-base cursor-pointer mx-[10px] transition-colors duration-300
                       hover:bg-new-blue disabled:bg-gray-400 disabled:cursor-not-allowed
                       mobile-max:mx-[5px] mobile-max:w-[calc(100%-10px)] // 20px gap + 10px from mx (total 20px)
                      "
          >
            {t('certify_location')}
          </button>
        </div>
        <div
          // .location-info
          className="mt-5 text-15 text-gray-800"
        >
          <p>
            {t('current_address')}:{' '}
            <strong className="text-brand-primary">{currentAddress}</strong>
          </p>
          <p>{locationStatus}</p>
        </div>
        <div
          id="kakao-map"
          ref={mapContainer}
          // #kakao-map
          className="w-full h-[500px] rounded-lg overflow-hidden relative"
        >
          {loadingLocation && (
            <div
              // .map-loading-overlay
              className="absolute top-0 left-0 w-full h-full bg-white/80 flex justify-center items-center text-lg text-gray-700 z-10"
            >
              {t('loading_map')}
            </div>
          )}
        </div>
      </section>

      {/* 새롭게 추가된 입력 주소 인증 박스 */}
      <section
        // .address-compare-section
        className="bg-white p-[30px] rounded-lg shadow-md mb-10 text-center border border-dashed border-gray-300
                   mobile-max:p-5 // 미디어 쿼리 적용
                  "
      >
        <h2
          // .address-compare-section h2
          className="text-gray-900 mb-[15px] text-2xl
                     mobile-max:text-24 // 미디어 쿼리 적용
                    "
        >
          {t('address_compare_title')}
        </h2>
        <p
          // .address-compare-section p
          className="text-gray-700 text-base leading-relaxed mb-[25px]"
        >
          {t('address_compare_desc')}
        </p>
        <div
          // .address-compare-section .input-group
          className="flex justify-center gap-[10px] mb-5
                     mobile-max:flex-col mobile-max:gap-[15px]
                    "
        >
          <input
            type="text"
            placeholder={t('enter_address_placeholder')}
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            disabled={loadingInputAddress}
            // .address-compare-section input[type="text"]
            className="flex-grow max-w-[400px] py-[12px] px-[15px] border border-gray-300 rounded-md text-base text-gray-800
                       placeholder:text-gray-500 focus:outline-none focus:border-brand-primary focus:shadow-[0_0_0_2px_var(--new-sky-blue)]
                       mobile-max:w-full mobile-max:max-w-none // 미디어 쿼리 적용
                      "
          />
          <button
            onClick={handleInputAddressCertification}
            disabled={loadingInputAddress || !currentLocationCoords}
            // .address-compare-section button
            className="bg-new-green text-white border-none py-[12px] px-[25px] rounded-md text-base cursor-pointer transition-colors duration-300
                       hover:bg-[#3cb371] disabled:bg-gray-400 disabled:cursor-not-allowed
                       mobile-max:w-full // 미디어 쿼리 적용
                      "
          >
            {loadingInputAddress ? t('loading') : t('compare_addresses')}
          </button>
        </div>
        <div
          // .compare-status-info
          className="mt-[15px] text-15 text-gray-800 font-bold"
        >
          <p>{inputAddressStatus}</p>
        </div>
      </section>

      {/* 기존 메인 섹션 콘텐츠 (예시) */}
      <section
        // .intro-section
        className="p-[30px] mt-10 bg-gray-50 rounded-lg"
      >
        <h2
          // .intro-section h2
          className="text-gray-900 text-2xl mb-[15px]"
        >
          {t('welcome_to_fino')}
        </h2>
        <p
          // .intro-section p
          className="text-gray-700 leading-relaxed"
        >
          {t('fino_description')}
        </p>
      </section>
      <section
        // .feature-highlight-section
        className="p-[30px] mt-10 bg-[#eef7ff] rounded-lg"
      >
        <h2
          // .feature-highlight-section h2
          className="text-brand-primary text-2xl mb-[15px]"
        >
          {t('key_features')}
        </h2>
        <ul
          // .feature-highlight-section ul
          className="list-none p-0"
        >
          <li
            // .feature-highlight-section li
            className="bg-white p-[15px] px-[20px] mb-[10px] rounded-md shadow-sm text-gray-800 font-medium"
          >
            {t('feature_design')}
          </li>
          <li
            // .feature-highlight-section li
            className="bg-white p-[15px] px-[20px] mb-[10px] rounded-md shadow-sm text-gray-800 font-medium"
          >
            {t('feature_database')}
          </li>
          <li
            // .feature-highlight-section li
            className="bg-white p-[15px] px-[20px] mb-[10px] rounded-md shadow-sm text-gray-800 font-medium"
          >
            {t('feature_logic')}
          </li>
        </ul>
      </section>
    </main>
  );
}

export default MainSection;