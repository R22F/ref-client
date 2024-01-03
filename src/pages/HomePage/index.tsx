import "../../App.css"
export const Homepage = () => {
  const logo = require("./cookingman.png");

  const notifications = [
    { title: '알림 제목', type: 'caution', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'warning', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'caution', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'caution', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'warning', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'warning', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'info', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'info', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'info', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'warning', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'warning', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },
    { title: '알림 제목', type: 'warning', content: '알림 내용입니다.', timestamp: '2023-01-01 01:01' },

  ];

  const IconType = (type: string) => {
    switch (type) {
      case 'caution': return "https://static.vecteezy.com/system/resources/previews/012/042/292/original/warning-sign-icon-transparent-background-png.png"
      case 'warning': return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/OOjs_UI_icon_alert-yellow.svg/240px-OOjs_UI_icon_alert-yellow.svg.png"
      case 'info': return "https://cdn-icons-png.flaticon.com/512/561/561170.png"
      default: return ""
    }
  }

  return (
      <div className="notification-list">
        {notifications.map((notification, index) => (
            <div key={index}>
              <div className="notification-box">
                <div className="notification-icon">
                  <img src={IconType(notification.type)} alt="아이콘"/>
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <h2 className="notification-title">{notification.title}</h2>
                    <p className="notification-date">{notification.timestamp}</p>
                  </div>
                  <p className="notification-description">{notification.content}</p>
                </div>
              </div>
            </div>
        ))}
      </div>
  )
};
