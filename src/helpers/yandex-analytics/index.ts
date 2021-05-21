import ym from "react-yandex-metrika";

//На случай если потребуется менять тригеры. Также полезно понимать какие триггеры у нас уже подключены

/* Триггеры */
export const yandexEvents: any = {
  /**
   * Нажатие на добавить камеру
   */

  addCameraClick: "stream_is74_add_camera_click",
  /**
   * Нажатие на check box, чтобы выбрать камеру в модальном окне камер
   * */
  clickCheckbox: "stream_is74_check_box_change_camera_click",
  /**
   * Нажали на очистить список в модальном окне камер*/

  clickClearList: "stream_is74_clear_list_click",
  /**
   * Нажали на запустить видеопоток на карточке видео*/
  clickPlayVideoCard: "stream_is74_card_video_start_click",
  /**
   * Нажали на архив на карточке с видео*/
  clickArchiveVideoCard: "stream_is74_card_video_archive_click",
  /**
   * Нажали удалить на карточке с видео*/
  clickDeleteVideoCard: "stream_is74_card_video_delete_click",
  /**
   * Нажали на паузу на карточке с видео*/
  clickPauseVideoCard: "stream_is74_card_video_pause_click",
  /**
   * Нажали на включить видео в HD на карточке с видео*/
  clickHdTurnOnVideoCard: "stream_is74_card_video_turn_on_HD_click",
  /**
   * Нажали на выключить видео в HD на карточке с видео*/
  clickHdTurnOffVideoCard: "stream_is74_card_video_turn_off_HD_click",
  /**
   * Нажали на полноэкранный режим видео на карточке с видео*/
  clickFullScreenVideoCard: "stream_is74_card_video_full_screen_click",
  /**
   * Нажали на сортировку по алфавиту в порядке возрастания*/
  clickSortAscName: "stream_is74_sort_asc_click",
  /**
   * Нажали на сортировку по алфавиту в порядке убывания*/
  clickSortDescName: "stream_is74_sort_desc_click",
  /**
   * Нажали вывод большой панели камер*/
  clickLargePanelView: "stream_is74_large_panel_click",
  /**
   * Нажали вывод 3-х камер в ряд*/
  clickThreeRowPanelView: "stream_is74_output_three_cam_click",
  /**
   * Нажали вывод 5-х камер в ряд*/
  clickFiveRowPanelView: "stream_is74_output_five_cam_click",
  /**
   * Нажали настроить сетку камер*/
  clickGridPanelView: "stream_is74_configure_cam_grid_click",
  /**
   * Нажали на режим карусели*/
  clickCarouselPanelView: "stream_is74_carousel_mode_click",
  /**
   * Нажали перейти на старую версию сайта*/
  clickOldRedirectPanel: "stream_is74_back_old_version_click",
  /**
   * Нажали перейти в соц сети*/
  clickSocialNetwork: "stream_is74_social_network_click",
  /**
   * Нажали войти в систему*/
  clickSignInBtn: "stream_is74_sign_in_click",
  /**
   * Нажали на перемотку на 5 секунд назад в плеере*/
  clickRewindPlayer: "stream_is74_player_rew_click",
  /**
   * Нажали на перемотку на 5 секунд вперед в плеере*/
  clickForwardPlayer: "stream_is74_player_ffwd_click",
  /**
   * Нажали на перейти в лайв в плеере*/
  clickLivePlayer: "stream_is74_player_live_click",
  /**
   * Нажали на выбор даты и времени в плеере */
  clickChangeTimePlayer: "stream_is74_player_change_time_click",
  /**
   * Нажали на выбор скорости воспроизведения в плеере */
  clickChangeSpeedPlayer: "stream_is74_player_playback_speed_click",
  /**
   * Нажали на скачать видео в плеере */
  clickDownloadModeBtnPlayer: "stream_is74_player_download_video_click",
  /**
   * Нажали на полный экран в плеере */
  clickFullScreenPlayer: "stream_is74_player_full_screen_click",
  /**
   * Нажали кнопку выйти из плеера "Назад" */
  clickBackBtnPlayer: "stream_is74_player_back_click",
  /**
   * Нажали на кнопку скачать видео в модальном окне скачивания */
  clickDownloadVideoModal: "stream_is74_download_video_click",
  /**
   * Нажали на таймлайн, чтобы найти конкретный момент в архиве */
  clickTimelinePlayer: "stream_is74_player_timeline_click",
  /**
   * Нажали в авторизации войти */
  clickAuthEntryLogIn: "stream_is74_auth_entry_click",
  /**
   * Нажали кнопку выйти */
  clickLogOut: "stream_is74_log_out_click",
  /**
   * Нажали на иконку избранное на снэпшоте плеера(Маленький плеер без архива)
   */
  clickFavouritesIconSnapshot: "stream_is74_player_snapshot_favourites_click",
  /**
   * Нажали на иконку открытия бокового меню
   */
  clickOpenIconSidemenu: "stream_is74_sidemenu_open_icon_click",
  /**
   * Нажали на иконку улиц онлайн в свернутом бокового меню
   */
  clickStreetsIconSidemenu: "stream_is74_sidemenu_streets_online_icon_click",
  /*
   * Нажали на иконку избранного в свернутом бокового меню
   */
  clickFavouritesIconSidemenu: "stream_is74_sidemenu_favourites_icon_click",

  /*
   * Нажали свернуть/развернуть улицы онлайн в боковом меню
   */
  clickSidemenuStreetsOpenIcon: "stream_is74_sidemenu_streets_open_icon_click",

  /*
   * Нажали на надпись "авторизоваться" во всплывающем Tooltip если элемент недоступен в неавторизованном виде
   */
  clickUnAuthTitleTooltip: "stream_is74_un_auth_title_tooltip_click",
  /*
   * Нажали на переход по иконке архив в live плеере
   */
  clickArchiveIconLivePlayer: "stream_is74_archlive_icon_live_player_click",
  /*
   * Нажали на выбор города в боковом меню
   */
  clickSidemenuStreetsChooseCity:
    "stream_is74_sidemenu_streets_choose_city_click",
};

/**
 * Обертка над функцией ym статистики
 * Отправить запрос Яндекс Аналитике
 * @param {string} triggerEvent - название события
 */
export const ymSendAnalytics = function(triggerEvent: string): void {
  if (process.env.NODE_ENV === "development") {
    return ym("reachGoal", triggerEvent);
  }
};
