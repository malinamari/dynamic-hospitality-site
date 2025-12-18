// Функция для сброса всех данных ARRURRU (только для разработки)
export const resetARRURRUData = () => {
  localStorage.removeItem('arrurru_users');
  localStorage.removeItem('arrurru_progress');
  localStorage.removeItem('arrurru_exam_results');
  localStorage.removeItem('arrurru_content');
  localStorage.removeItem('arrurru_session');
  localStorage.removeItem('arrurru_current_user');
  localStorage.removeItem('arrurru_invitations');
  localStorage.removeItem('arrurru_selected_project');
  console.log('🔄 ARRURRU data reset complete!');
  window.location.reload();
};

// Вызови эту функцию в консоли браузера: resetARRURRUData()
if (typeof window !== 'undefined') {
  (window as any).resetARRURRUData = resetARRURRUData;
}
