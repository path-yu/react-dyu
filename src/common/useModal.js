import { Modal } from 'antd-mobile';
const alert = Modal.alert;
export default function useModal(
  title = '删除',
  content = '你确定要删除吗?',
  confirmText = '确定',
  cancelText = '取消'
) {
  let alertInstance = null;

  function showAlert() {
    // 返回一个promise ,但点击确定返回true, 点击取消返回false;
    return new Promise((resolve, reject) => {
      alertInstance = alert(title, content, [
        {
          text: cancelText,
          onPress: () => resolve(false),
          style: 'default',
        },
        {
          text: confirmText,
          onPress: () => resolve(true),
        },
      ]);
    });
  }

  function close() {
    alertInstance.close();
  }
  return {
    close,
    showAlert,
  };
}
