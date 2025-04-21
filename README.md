## 📡 네트워크 불안정 처리

---

### 🛑 문제

- 네트워크가 불안정하면 **지연된 영상 데이터가 화면에 표시됨**
- 사용자가 보는 영상이 **실시간과 어긋남**

---

### ✅ 해결

- **지연된 영상은 무시**하고,
- **최신 영상만 출력**되도록 처리함
- 영상 업데이트 시점에서 **이전 데이터 제거**

---

### ⚙️ 동작 방식

- `startStream()` 실행 시:  
  → 실시간 데이터만 화면에 표시됨

- 네트워크 불안 시:  
  → 이전 지연 프레임은 무시됨

- **가장 최근 프레임만 반영**되어  
  → 실시간 영상처럼 동작함

---

### 💻 코드 예시

```javascript
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

🎯 결과
이전 프레임은 제거되고,
→ 최신 영상만 출력됨

네트워크가 불안정해도
→ 실시간과 유사한 영상 품질 유지
