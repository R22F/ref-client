import "./index.css"
import {useRecoilValue} from "recoil";
import {isMobile} from "../../recoil/DBAtom";

export const Homepage = () => {

  const isMobileState = useRecoilValue(isMobile)
  const notifications = [
    { title: '주의 알림', type: 'caution', content: '긴급하지 않은 알림', timestamp: '2023-01-01 01:01' },
    { title: '경고 알림', type: 'warning', content: '긴급한 알림', timestamp: '2023-01-01 01:01' },
    { title: '주의 알림', type: 'caution', content: '긴급하지 않은 알림', timestamp: '2023-01-01 01:01' },
    { title: '정보 알림', type: 'info', content: '일반적인 정보', timestamp: '2023-01-01 01:01' },
    { title: '경고 알림', type: 'warning', content: '긴급한 알림', timestamp: '2023-01-01 01:01' },
    { title: '경고 알림', type: 'warning', content: '긴급한 알림', timestamp: '2023-01-01 01:01' },
    { title: '주의 알림', type: 'caution', content: '긴급하지 않은 알림', timestamp: '2023-01-01 01:01' },
    { title: '정보 알림', type: 'info', content: '일반적인 정보', timestamp: '2023-01-01 01:01' },
    { title: '정보 알림', type: 'info', content: '일반적인 정보', timestamp: '2023-01-01 01:01' },
    { title: '경고 알림', type: 'warning', content: '긴급한 알림', timestamp: '2023-01-01 01:01' },
    { title: '경고 알림', type: 'warning', content: '긴급한 알림', timestamp: '2023-01-01 01:01' },
    { title: '경고 알림', type: 'warning', content: '긴급한 알림', timestamp: '2023-01-01 01:01' },
  ];

  const IconType = (type: string) => {
    switch (type) {
      case 'caution': return "https://static.vecteezy.com/system/resources/previews/012/042/292/original/warning-sign-icon-transparent-background-png.png"
      case 'warning': return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/OOjs_UI_icon_alert-yellow.svg/240px-OOjs_UI_icon_alert-yellow.svg.png"
      case 'info': return "https://cdn-icons-png.flaticon.com/512/561/561170.png"
      default: return ""
    }
  }

  function Notification() {
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
    );
  }

  return (
      <>
        {isMobileState ?
            <div className="m-[1rem]">
              <Notification/>
            </div>
            :
          <div className="flex justify-center">
            <div className="m-auto mt-12 flex-col w-[60rem] sm:-mx-6 lg:-mx-6 border-4 rounded-md px-4 py-6">
              <Notification/>
            </div>
          </div>
        }
      </>
  )
};
