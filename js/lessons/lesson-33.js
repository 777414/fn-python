/* Занятие 33. Запись короткого звука с микрофона и сохранение WAV. */
window.LESSONS = window.LESSONS || {};
window.LESSONS['may-2'] = [
 {
  "kicker": "МАЙ · ЗАНЯТИЕ 02",
  "title": "Добавим в Soundboard Studio запись звука",
  "lead": "На прошлом занятии мы научили приложение запускать готовые звуки. Сегодня подключим микрофон и запишем собственный короткий звук.",
  "note": "В конце занятия программа сможет записать до пяти секунд звука и сохранить его в WAV-файл."
 },
 {
  "kicker": "ВСПОМИНАЕМ ПРОЕКТ",
  "title": "Что уже умеет Soundboard Studio?",
  "items": [
   {
    "title": "Открывать окно",
    "text": "Интерфейс создан на CustomTkinter."
   },
   {
    "title": "Запускать WAV",
    "text": "soundfile читает файл, sounddevice воспроизводит его."
   },
   {
    "title": "Реагировать на кнопки",
    "text": "У каждой кнопки есть функция-обработчик."
   }
  ]
 },
 {
  "kicker": "НОВАЯ ВОЗМОЖНОСТЬ",
  "title": "Теперь звук можно записать самому",
  "lead": "Нажмём кнопку записи, скажем что-нибудь в микрофон и сохраним результат.",
  "items": [
   {
    "title": "Начать запись",
    "text": "Приложение включает микрофон."
   },
   {
    "title": "Записать короткий фрагмент",
    "text": "Ограничим запись пятью секундами."
   },
   {
    "title": "Сохранить WAV",
    "text": "Запись станет обычным звуковым файлом."
   },
   {
    "title": "Прослушать",
    "text": "Сможем проверить, что получилось."
   }
  ]
 },
 {
  "kicker": "ПЕРЕД ЗАПИСЬЮ",
  "title": "Проверим оборудование и разрешения",
  "list": [
   "Подключён ли микрофон или есть ли встроенный микрофон?",
   "Разрешено ли приложению Python использовать микрофон?",
   "Выбрано ли правильное устройство записи в настройках компьютера?",
   "Работают ли динамики или наушники для прослушивания?"
  ],
  "note": "Записываем только с явного нажатия кнопки. Перед записью предупреди окружающих и не записывай чужие разговоры без разрешения."
 },
 {
  "kicker": "ПЛАН НА СЕГОДНЯ",
  "title": "Пять шагов до собственной записи",
  "list": [
   "Подготовим папку sounds/custom/.",
   "Разберём команду записи sounddevice.rec().",
   "Добавим кнопку «Записать».",
   "Ограничим запись пятью секундами и сохраним WAV.",
   "Добавим прослушивание записанного файла."
  ]
 },
 {
  "kicker": "ПАПКА ДЛЯ ЗАПИСЕЙ",
  "title": "Отделим свои звуки от готовых",
  "code": "Soundboard/\n    main.py\n    sounds/\n        default/\n        custom/\n            my_recording.wav",
  "reveals": [
   "default — папка с подготовленными звуками.",
   "custom — папка для записей пользователя.",
   "Сегодня сохраним первую запись в my_recording.wav.",
   "Папку custom нужно создать заранее."
  ],
  "note": "Сейчас открой проект Soundboard из прошлого занятия. Код будем добавлять в существующий main.py, а не создавать второй файл. Папку sounds/custom/ создай вручную рядом с папкой default."
 },
 {
  "kicker": "РАБОТАЕМ В ОДНОМ ФАЙЛЕ",
  "title": "Куда записывать новый код?",
  "lead": "Продолжаем проект из прошлого занятия. Открой тот же файл main.py — второй файл создавать не нужно.",
  "items": [
   {
    "title": "Сохраняем основу",
    "text": "В main.py уже есть окно, кнопки готовых звуков и функция play_sound()."
   },
   {
    "title": "Добавляем новые функции",
    "text": "Функции записи вставим рядом с функциями воспроизведения."
   },
   {
    "title": "Добавляем кнопки",
    "text": "Две новые кнопки разместим рядом с кнопкой остановки звука."
   }
  ],
  "note": "В конце занятия покажем полный main.py целиком. Его можно будет сравнить со своим файлом."
 },
 {
  "kicker": "ИНСТРУМЕНТ ДЛЯ ЗАПИСИ",
  "title": "Команда sounddevice.rec()",
  "lead": "Открой main.py. Новые команды записи будем добавлять в этот же файл. Пока разбираем их отдельно, а ниже покажем точное место для каждой части.",
  "code": "recording = sd.rec(\n    frames=220500,\n    samplerate=44100,\n    channels=1\n)",
  "reveals": [
   "rec() запускает запись звука.",
   "frames — сколько звуковых измерений записать.",
   "samplerate — частота записи: 44 100 измерений в секунду.",
   "channels=1 означает запись в один канал — моно.",
   "Результат записи сохраняем в переменную recording."
  ]
 },
 {
  "kicker": "СКОЛЬКО ЗАПИСЫВАТЬ?",
  "title": "Пять секунд — достаточно для начала",
  "lead": "Чтобы запись была короткой, рассчитаем количество измерений: 5 секунд × 44 100 измерений в секунду.",
  "code": "duration = 5\nsamplerate = 44100\nframes = duration * samplerate\nprint(frames)  # 220500",
  "reveals": [
   "duration хранит длительность записи в секундах.",
   "samplerate хранит частоту записи.",
   "Умножаем длительность на частоту.",
   "Для пяти секунд получаем 220 500 измерений."
  ]
 },
 {
  "kicker": "ЗАПИСЫВАЕМ",
  "title": "Запуск записи в одну команду",
  "code": "recording = sd.rec(\n    int(duration * samplerate),\n    samplerate=samplerate,\n    channels=1\n)",
  "reveals": [
   "Сначала вычисляем количество измерений.",
   "int() превращает результат в целое число.",
   "channels=1 задаёт моно-запись.",
   "Запись начинается после вызова sd.rec()."
  ]
 },
 {
  "kicker": "КАК ПОНЯТЬ, ЧТО ЗАПИСЬ ЗАКОНЧЕНА?",
  "title": "Команда sd.wait()",
  "code": "sd.wait()",
  "reveals": [
   "sd.wait() ждёт, пока текущая запись завершится.",
   "После этой команды можно работать с готовыми данными.",
   "Но если вызвать её прямо в обработчике кнопки, окно на время ожидания перестанет реагировать.",
   "Поэтому в приложении используем таймер окна, чтобы дать интерфейсу обновиться."
  ],
  "note": "Эту команду не нужно запускать отдельно в начале программы. Она будет внутри функции finish_recording(), которую добавим ниже."
 },
 {
  "kicker": "НЕ БЛОКИРУЕМ ОКНО",
  "title": "Покажем сообщение во время записи",
  "lead": "Запись запускается сразу, а завершение назначим через app.after(). Окно сможет показать надпись «Идёт запись…».",
  "code": "recording = sd.rec(220500, samplerate=44100, channels=1)\nstatus_label.configure(text=\"Идёт запись…\")\napp.after(5200, finish_recording)",
  "reveals": [
   "sd.rec() начинает запись и сразу возвращает управление программе.",
   "configure() меняет текст статуса.",
   "app.after(5200, ...) попросит окно вызвать функцию примерно через 5,2 секунды.",
   "Небольшой запас времени нужен, чтобы запись успела завершиться."
  ]
 },
 {
  "kicker": "СОХРАНЯЕМ WAV",
  "title": "Записываем данные в файл",
  "code": "sd.wait()\nsf.write(\"sounds/custom/my_recording.wav\", recording, 44100)",
  "reveals": [
   "sd.wait() дожидается окончания записи.",
   "sf.write() сохраняет звуковые данные в файл.",
   "Первый аргумент — путь и имя файла.",
   "Второй — записанные данные, третий — частота дискретизации."
  ]
 },
 {
  "kicker": "ФУНКЦИЯ ЗАВЕРШЕНИЯ",
  "title": "Соберём ожидание и сохранение",
  "code": "def finish_recording():\n    sd.wait()\n    sf.write(\n        \"sounds/custom/my_recording.wav\",\n        recording,\n        samplerate\n    )\n    status_label.configure(text=\"Запись сохранена!\")",
  "reveals": [
   "finish_recording() вызывается после таймера app.after().",
   "Сначала дожидаемся окончания записи.",
   "Затем сохраняем данные в WAV.",
   "В конце сообщаем пользователю, что файл готов."
  ],
  "lead": "Эту функцию добавим в main.py рядом с функциями play_bell(), play_clap() и play_success() — до создания кнопок интерфейса."
 },
 {
  "kicker": "ПРОВЕРЯЕМ ПАПКУ",
  "title": "Где появится наша запись?",
  "lead": "После успешного сохранения в папке sounds/custom появится файл my_recording.wav.",
  "code": "sounds/custom/my_recording.wav",
  "note": "Если папки custom нет, сохранить файл по этому пути не получится. Создай её до запуска программы."
 },
 {
  "kicker": "ПРОСЛУШИВАЕМ ЗАПИСЬ",
  "title": "Используем знакомую функцию play_sound()",
  "code": "def play_recording():\n    play_sound(\"sounds/custom/my_recording.wav\")",
  "reveals": [
   "Мы уже умеем читать и запускать WAV-файлы.",
   "play_sound() получает путь к нашей записи.",
   "Никакой новой команды воспроизведения не требуется.",
   "Сначала запись нужно сохранить, и только потом прослушивать."
  ],
  "lead": "Добавь эту функцию в main.py рядом с остальными функциями. Она использует уже существующую play_sound() из прошлого занятия."
 },
 {
  "kicker": "ДОБАВЛЯЕМ КНОПКУ",
  "title": "Кнопка «Записать»",
  "code": "record_button = ctk.CTkButton(\n    app,\n    text=\"● Записать 5 секунд\",\n    command=start_recording\n)\nrecord_button.pack(pady=8)",
  "reveals": [
   "Создаём кнопку CustomTkinter.",
   "text задаёт надпись на кнопке.",
   "command связывает её с функцией start_recording.",
   "Функцию передаём без скобок."
  ],
  "lead": "Этот код добавим в нижнюю часть main.py, где уже создаются кнопки Звонок, Аплодисменты и Победа. Размести его после status_label."
 },
 {
  "kicker": "КНОПКА ПРОСЛУШИВАНИЯ",
  "title": "Кнопка «Прослушать запись»",
  "code": "play_record_button = ctk.CTkButton(\n    app,\n    text=\"▶ Прослушать запись\",\n    command=play_recording\n)\nplay_record_button.pack(pady=8)",
  "reveals": [
   "Создаём вторую кнопку.",
   "Она вызывает функцию play_recording().",
   "Пользователь сможет проверить результат записи."
  ],
  "lead": "Сразу после кнопки записи добавь кнопку прослушивания. Она будет вызывать play_recording()."
 },
 {
  "kicker": "ЗАЩИЩАЕМСЯ ОТ ПОВТОРНОГО НАЖАТИЯ",
  "title": "Во время записи кнопка должна быть выключена",
  "code": "record_button.configure(state=\"disabled\")",
  "reveals": [
   "state=\"disabled\" временно отключает кнопку.",
   "Это не позволит запустить несколько записей одновременно.",
   "После сохранения снова включим кнопку с state=\"normal\"."
  ]
 },
 {
  "kicker": "ВОЗВРАЩАЕМ КНОПКУ",
  "title": "Запись закончилась — можно записывать снова",
  "code": "record_button.configure(state=\"normal\")",
  "reveals": [
   "После сохранения включаем кнопку обратно.",
   "Теперь пользователь может сделать следующую запись.",
   "При желании новая запись перезапишет файл my_recording.wav."
  ]
 },
 {
  "kicker": "ФУНКЦИЯ НАЧАЛА ЗАПИСИ",
  "title": "Объединим команды в start_recording()",
  "code": "def start_recording():\n    record_button.configure(state=\"disabled\")\n    status_label.configure(text=\"Идёт запись…\")\n    global recording\n    recording = sd.rec(\n        int(5 * samplerate),\n        samplerate=samplerate,\n        channels=1\n    )\n    app.after(5200, finish_recording)",
  "reveals": [
   "Сначала отключаем кнопку, чтобы не запустить вторую запись.",
   "Меняем надпись статуса.",
   "sd.rec() начинает запись на пять секунд.",
   "global recording позволяет сохранить результат в переменную, доступную функции завершения.",
   "app.after() назначает сохранение после окончания записи."
  ],
  "lead": "В main.py найди блок с функциями воспроизведения. После stop_sound() добавь start_recording() и finish_recording(). Не вставляй эти функции внутрь других функций."
 },
 {
  "kicker": "ЗАВЕРШАЕМ ЗАПИСЬ",
  "title": "Полная функция finish_recording()",
  "code": "def finish_recording():\n    sd.wait()\n    sf.write(\n        \"sounds/custom/my_recording.wav\",\n        recording,\n        samplerate\n    )\n    status_label.configure(text=\"Запись сохранена!\")\n    record_button.configure(state=\"normal\")",
  "reveals": [
   "Дожидаемся окончания записи.",
   "Сохраняем её в WAV-файл.",
   "Показываем сообщение об успехе.",
   "Снова разрешаем нажимать кнопку записи."
  ],
  "lead": "Это итоговый вариант функции finish_recording(). Если уже добавил её по предыдущему слайду, проверь, что код совпадает."
 },
 {
  "kicker": "ПОЛНАЯ ПРОГРАММА",
  "title": "Добавляем запись в Soundboard Studio",
  "code": "import customtkinter as ctk\nimport sounddevice as sd\nimport soundfile as sf\n\nctk.set_appearance_mode(\"dark\")\nctk.set_default_color_theme(\"blue\")\n\nsamplerate = 44100\nrecording = None\n\napp = ctk.CTk()\napp.title(\"Soundboard Studio\")\napp.geometry(\"560x520\")\n\ndef play_sound(filename):\n    data, file_samplerate = sf.read(filename)\n    sd.play(data, file_samplerate)\n\ndef play_bell():\n    play_sound(\"sounds/default/bell.wav\")\n    status_label.configure(text=\"Сейчас играет: Звонок\")\n\ndef play_clap():\n    play_sound(\"sounds/default/clap.wav\")\n    status_label.configure(text=\"Сейчас играет: Аплодисменты\")\n\ndef play_success():\n    play_sound(\"sounds/default/success.wav\")\n    status_label.configure(text=\"Сейчас играет: Победа\")\n\ndef stop_sound():\n    sd.stop()\n    status_label.configure(text=\"Воспроизведение остановлено\")\n\ndef start_recording():\n    global recording\n    record_button.configure(state=\"disabled\")\n    status_label.configure(text=\"Идёт запись 5 секунд…\")\n    recording = sd.rec(\n        int(5 * samplerate),\n        samplerate=samplerate,\n        channels=1\n    )\n    app.after(5200, finish_recording)\n\ndef finish_recording():\n    sd.wait()\n    sf.write(\n        \"sounds/custom/my_recording.wav\",\n        recording,\n        samplerate\n    )\n    status_label.configure(text=\"Запись сохранена!\")\n    record_button.configure(state=\"normal\")\n\ndef play_recording():\n    play_sound(\"sounds/custom/my_recording.wav\")\n\ntitle_label = ctk.CTkLabel(\n    app,\n    text=\"Soundboard Studio\",\n    font=(\"Arial\", 26, \"bold\")\n)\ntitle_label.pack(pady=20)\n\nsound_frame = ctk.CTkFrame(app)\nsound_frame.pack(pady=15, padx=20, fill=\"x\")\n\nbell_button = ctk.CTkButton(\n    sound_frame,\n    text=\"🔔 Звонок\",\n    command=play_bell\n)\nbell_button.grid(row=0, column=0, padx=8, pady=12)\n\nclap_button = ctk.CTkButton(\n    sound_frame,\n    text=\"👏 Аплодисменты\",\n    command=play_clap\n)\nclap_button.grid(row=0, column=1, padx=8, pady=12)\n\nsuccess_button = ctk.CTkButton(\n    sound_frame,\n    text=\"🏆 Победа\",\n    command=play_success\n)\nsuccess_button.grid(row=0, column=2, padx=8, pady=12)\n\nstatus_label = ctk.CTkLabel(app, text=\"Выбери звук\")\nstatus_label.pack(pady=12)\n\nstop_button = ctk.CTkButton(\n    app,\n    text=\"■ Остановить звук\",\n    command=stop_sound\n)\nstop_button.pack(pady=8)\n\nrecord_button = ctk.CTkButton(\n    app,\n    text=\"● Записать 5 секунд\",\n    command=start_recording\n)\nrecord_button.pack(pady=8)\n\nplay_record_button = ctk.CTkButton(\n    app,\n    text=\"▶ Прослушать запись\",\n    command=play_recording\n)\nplay_record_button.pack(pady=8)\n\napp.mainloop()",
  "reveals": [
   "Это полный файл main.py: выдели весь код и вставь его вместо старого содержимого main.py.",
   "Вверху подключаем CustomTkinter и аудиобиблиотеки, затем создаём окно.",
   "Функции воспроизведения из прошлого занятия остались в программе.",
   "Новые функции start_recording(), finish_recording() и play_recording() добавляют запись и прослушивание.",
   "Ниже создаём все кнопки. В самом конце запускаем app.mainloop()."
  ],
  "note": "Перед запуском проверь, что рядом с main.py есть sounds/default/ с тремя WAV-файлами и пустая папка sounds/custom/."
 },
 {
  "kicker": "ПРОВЕРЯЕМ СТРУКТУРУ",
  "title": "Как должны выглядеть папки проекта?",
  "code": "Soundboard/\\n    main.py\\n    sounds/\\n        default/\\n            bell.wav\\n            clap.wav\\n            success.wav\\n        custom/\\n            (пока пусто)",
  "reveals": [
   "main.py содержит весь код приложения.",
   "В default лежат три готовых WAV-файла.",
   "В custom сначала пусто — сюда программа сохранит запись.",
   "Создай папку custom вручную до запуска программы."
  ]
 },
 {
  "kicker": "ПРОВЕРЯЕМ РЕЗУЛЬТАТ",
  "title": "Наш первый звуковой файл",
  "list": [
   "Нажми «Записать 5 секунд».",
   "Произнеси короткую фразу или хлопни в ладоши.",
   "Дождись сообщения «Запись сохранена!».",
   "Убедись, что my_recording.wav появился в sounds/custom/.",
   "Нажми «Прослушать запись»."
  ]
 },
 {
  "kicker": "ЕСЛИ НЕ ПОЛУЧИЛОСЬ",
  "title": "Что проверить при проблемах с записью?",
  "items": [
   {
    "title": "Нет доступа к микрофону",
    "text": "Проверь разрешения операционной системы."
   },
   {
    "title": "Записалась тишина",
    "text": "Проверь выбранный микрофон и уровень громкости."
   },
   {
    "title": "Файл не сохранился",
    "text": "Убедись, что папка sounds/custom существует."
   },
   {
    "title": "Ошибка устройства",
    "text": "Проверь, не используется ли микрофон другой программой."
   }
  ]
 },
 {
  "kicker": "ПРАВИЛА ЗАПИСИ",
  "title": "Записываем аккуратно и безопасно",
  "list": [
   "Запись начинается только после нажатия кнопки.",
   "Длительность ограничена пятью секундами.",
   "Не записывай личные данные и чужие разговоры без согласия.",
   "Перед новой записью помни: файл my_recording.wav будет заменён."
  ]
 },
 {
  "kicker": "ПРАКТИКА · БАЗОВЫЙ УРОВЕНЬ",
  "title": "Запиши и прослушай свой звук",
  "list": [
   "Добавь кнопку записи в приложение.",
   "Ограничь запись пятью секундами.",
   "Сохрани результат в sounds/custom/my_recording.wav.",
   "Добавь кнопку прослушивания."
  ]
 },
 {
  "kicker": "ПРАКТИКА · УЛУЧШЕННЫЙ УРОВЕНЬ",
  "title": "Сделай запись удобнее",
  "list": [
   "Добавь отдельную надпись «Готово к записи».",
   "Меняй текст статуса во время и после записи.",
   "Добавь кнопку повторной записи.",
   "Подумай, как сообщить пользователю, что предыдущий файл будет заменён."
  ]
 },
 {
  "kicker": "ПРАКТИКА · ТВОРЧЕСКИЙ УРОВЕНЬ",
  "title": "Запиши несколько звуков",
  "list": [
   "Сделай отдельные кнопки для записи разных коротких звуков.",
   "Сохраняй их под разными именами файлов.",
   "Добавь кнопку прослушивания для каждого файла.",
   "Придумай собственные названия записей."
  ]
 },
 {
  "kicker": "ИТОГ ЗАНЯТИЯ",
  "title": "Теперь Soundboard Studio умеет записывать",
  "list": [
   "Подключили микрофон через sounddevice.",
   "Научились запускать запись с помощью sd.rec().",
   "Ограничили длительность пятью секундами.",
   "Сохранили данные в WAV через sf.write().",
   "Добавили кнопку прослушивания собственной записи."
  ]
 },
 {
  "kicker": "ЧТО ДАЛЬШЕ?",
  "title": "На следующем занятии соберём свою коллекцию",
  "lead": "Добавим названия звуков, будем создавать для них кнопки и научим программу сохранять список звуков в JSON.",
  "note": "Сегодня мы научились получать собственный звук и сохранять его как WAV-файл."
 }
];
