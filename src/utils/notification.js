import { store } from "react-notifications-component"

export const showMessage = (msg, msgType) => (
  store.addNotification({
    title: "",
    message: msg,
    type: msgType,
    insert: "top",
    container: "top-left",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 3000,
      showIcon: true
    }
  })
)