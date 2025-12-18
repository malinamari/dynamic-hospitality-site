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

// Функция для перезагрузки только контента (без удаления пользователей)
export const reloadContent = () => {
  localStorage.removeItem('arrurru_content');
  localStorage.removeItem('arrurru_content_version');
  console.log('📚 ARRURRU content reloaded!');
  window.location.reload();
};

// Функция для принудительной очистки при загрузке (если версия устарела)
export const forceContentUpdate = () => {
  const CONTENT_VERSION_KEY = 'arrurru_content_version';
  const CURRENT_VERSION = '10.3';
  const storedVersion = localStorage.getItem(CONTENT_VERSION_KEY);
  
  if (storedVersion !== CURRENT_VERSION) {
    console.log('🔄 Forcing content update from', storedVersion, 'to', CURRENT_VERSION);
    localStorage.removeItem('arrurru_content');
    localStorage.setItem(CONTENT_VERSION_KEY, CURRENT_VERSION);
    window.location.reload();
  }
};

// Вызови эти функции в консоли браузера:
// resetARRURRUData() - полный сброс
// reloadContent() - только перезагрузка контента
if (typeof window !== 'undefined') {
  (window as any).resetARRURRUData = resetARRURRUData;
  (window as any).reloadContent = reloadContent;
}