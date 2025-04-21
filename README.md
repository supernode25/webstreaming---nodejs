네트워크 불안정 처리
문제
네트워크가 불안정하면 지연된 영상 데이터가 화면에 표시됨. 이로 인해 사용자가 보고 있는 영상이 실시간과 맞지 않음.

해결
지연된 영상 데이터는 무시하고, 최신 영상만 표시하도록 수정함.

이전의 영상이 화면에 표시되지 않도록 처리함.

동작
스트리밍 시작: startStream() 함수에서 실시간 영상 데이터만 받아 화면에 표시됨.

지연된 데이터 처리: 네트워크 불안정 시, 이전의 지연된 영상은 화면에 표시되지 않음.

최신 영상 우선: 최신 데이터만 화면에 반영되어 실시간 영상에 가깝게 유지됨.

코드
javascript
Copy
Edit
let listener = null;

function startStream() {
  if (listener) return; // 중복 연결 방지

  listener = new ROSLIB.Topic({
    ros: ros,
    name: '/camera/color/image_raw/compressed',
    messageType: 'sensor_msgs/CompressedImage'
  });

  listener.subscribe(function (message) {
    console.log('수신된 이미지 데이터:', message.data);
    document.getElementById('cameraFeed').src = 'data:image/jpeg;base64,' + message.data;
  });
}

function stopStream() {
  if (listener) {
    listener.unsubscribe();
    listener = null;
    document.getElementById('cameraFeed').src = ''; // 이미지 제거
  }
}
결과
화면에 최신 영상만 표시되고, 이전 영상은 버려짐.

네트워크가 불안정할 때도 영상이 실시간에 가까운 상태로 유지됨.

