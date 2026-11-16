/* Занятие 34. Запись собственного звука в Soundboard Studio. */
window.LESSONS = window.LESSONS || {};
window.LESSONS['may-3'] = [
 {
  "kicker": "МАЙ · ЗАНЯТИЕ 03",
  "title": "Записываем собственные звуки",
  "lead": "На прошлом занятии Soundboard Studio научилась импортировать и воспроизводить WAV-файлы. Сегодня подключим микрофон и добавим запись собственного звука.",
  "note": "Результат: можно записать звук длительностью до пяти секунд, прослушать его, повторить запись или сохранить в коллекцию."
 },
 {
  "kicker": "ВСПОМИНАЕМ",
  "title": "Что уже умеет приложение?",
  "items": [
   {
    "title": "Импорт WAV",
    "text": "Выбираем готовый файл с компьютера."
   },
   {
    "title": "Карточки звуков",
    "text": "Каждый звук описан словарём в общем списке."
   },
   {
    "title": "Воспроизведение",
    "text": "Запускаем звук и останавливаем его кнопкой."
   }
  ]
 },
 {
  "kicker": "ПЛАН ЗАНЯТИЯ",
  "title": "Добавим запись в приложение",
  "list": [
   "Подготовим папку для пользовательских звуков.",
   "Создадим модуль recorder.py.",
   "Запишем звук с микрофона не дольше пяти секунд.",
   "Сохраним запись во временный WAV-файл.",
   "Добавим кнопки прослушивания и повторной записи.",
   "Научимся сохранять запись или отменять её."
  ]
 },
 {
  "kicker": "ПЕРЕД НАЧАЛОМ",
  "title": "Проверяем микрофон",
  "items": [
   {
    "title": "Подключи микрофон",
    "text": "Это может быть микрофон ноутбука или гарнитуры."
   },
   {
    "title": "Разреши доступ",
    "text": "Операционная система может спросить разрешение на использование микрофона."
   },
   {
    "title": "Проверь звук",
    "text": "Убедись, что микрофон выбран и не выключен."
   }
  ],
  "note": "Запись запускается только после нажатия кнопки пользователем. Максимальная длительность — 5 секунд."
 },
 {
  "kicker": "КАК РАБОТАЕТ ЗАПИСЬ",
  "title": "Пять секунд — и готово",
  "list": [
   "Пользователь нажимает «Записать».",
   "Приложение показывает, что идёт запись.",
   "sounddevice получает звук с микрофона.",
   "Через пять секунд запись автоматически заканчивается.",
   "soundfile сохраняет её во временный WAV-файл."
  ]
 },
 {
  "kicker": "НОВЫЙ МОДУЛЬ",
  "title": "Зачем нужен recorder.py?",
  "lead": "Логику записи вынесем из интерфейса в отдельный файл. Так окно отвечает за кнопки, а recorder.py — за работу с микрофоном и аудиофайлом.",
  "code": "SoundboardStudio/\n  main.py\n  recorder.py       ← создаём сегодня\n  interface/\n    window.py\n    controls.py\n    sound_panel.py"
 },
 {
  "kicker": "ПОДКЛЮЧАЕМ БИБЛИОТЕКИ",
  "title": "Что понадобится в recorder.py?",
  "code": "import os\nimport sounddevice as sd\nimport soundfile as sf",
  "reveals": [
   "os поможет создать папку для пользовательских звуков.",
   "sounddevice записывает звук с микрофона.",
   "soundfile сохраняет запись в WAV.",
   "Все три библиотеки уже перечислены в requirements.txt."
  ]
 },
 {
  "kicker": "НАСТРОЙКИ ЗАПИСИ",
  "title": "Ограничиваем запись пятью секундами",
  "code": "RECORD_SECONDS = 5\nSAMPLE_RATE = 44100",
  "reveals": [
   "RECORD_SECONDS — максимальная длительность записи.",
   "SAMPLE_RATE — частота дискретизации.",
   "44100 — распространённое значение для звука.",
   "Постоянные настройки записывают заглавными буквами."
  ]
 },
 {
  "kicker": "ЗАПИСЬ С МИКРОФОНА",
  "title": "Команда sd.rec()",
  "lead": "sounddevice умеет записывать звук с микрофона. Сначала укажем, сколько звуковых отсчётов нужно получить.",
  "code": "recording = sd.rec(\n    int(RECORD_SECONDS * SAMPLE_RATE),\n    samplerate=SAMPLE_RATE,\n    channels=1\n)",
  "reveals": [
   "sd.rec() начинает запись.",
   "Количество отсчётов = секунды × частота дискретизации.",
   "channels=1 означает один канал — моно.",
   "Запись длится не более пяти секунд."
  ]
 },
 {
  "kicker": "ДОЖИДАЕМСЯ ЗАВЕРШЕНИЯ",
  "title": "Команда sd.wait()",
  "code": "sd.wait()",
  "lead": "После запуска записи программа должна дождаться, пока микрофон соберёт все данные.",
  "reveals": [
   "sd.wait() ждёт завершения записи.",
   "После этой команды переменная recording содержит полученный звук.",
   "В нашем простом учебном варианте окно на короткое время занято записью."
  ]
 },
 {
  "kicker": "ВРЕМЕННЫЙ WAV",
  "title": "Сохраняем запись через soundfile",
  "code": "sf.write(temp_path, recording, SAMPLE_RATE)",
  "reveals": [
   "sf.write() записывает звуковые данные в файл.",
   "temp_path — путь к временному WAV-файлу.",
   "recording — данные, полученные с микрофона.",
   "SAMPLE_RATE — частота дискретизации записи."
  ]
 },
 {
  "kicker": "ГДЕ ХРАНИТЬ ЗАПИСЬ?",
  "title": "Создаём папку sounds/custom",
  "code": "os.makedirs(\"sounds/custom\", exist_ok=True)",
  "reveals": [
   "Папка sounds/custom хранит звуки, созданные пользователем или добавленные в коллекцию.",
   "exist_ok=True означает: если папка уже существует, ошибки не будет.",
   "Временная запись тоже будет находиться здесь, пока пользователь не сохранит или не отменит её."
  ]
 },
 {
  "kicker": "ФУНКЦИЯ ЗАПИСИ",
  "title": "Собираем шаги в record_audio()",
  "lead": "Создадим функцию, которая показывает статус, записывает до пяти секунд и сохраняет временный WAV-файл.",
  "code": "def record_audio(status_label):\n    os.makedirs(\"sounds/custom\", exist_ok=True)\n    temp_path = \"sounds/custom/_preview.wav\"\n\n    status_label.configure(text=\"Идёт запись...\")\n    status_label.update_idletasks()\n\n    recording = sd.rec(\n        int(RECORD_SECONDS * SAMPLE_RATE),\n        samplerate=SAMPLE_RATE,\n        channels=1\n    )\n    sd.wait()\n    sf.write(temp_path, recording, SAMPLE_RATE)\n\n    status_label.configure(text=\"Запись готова. Прослушай её.\")\n    return temp_path",
  "reveals": [
   "Функция принимает строку состояния интерфейса.",
   "update_idletasks() помогает сразу показать сообщение о записи.",
   "После пяти секунд данные сохраняются во временный WAV.",
   "return temp_path возвращает путь к записи, чтобы другие функции могли её открыть."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ ФАЙЛ",
  "title": "Сохрани recorder.py",
  "code": "import os\nimport sounddevice as sd\nimport soundfile as sf\n\nRECORD_SECONDS = 5\nSAMPLE_RATE = 44100\n\n\ndef record_audio(status_label):\n    os.makedirs(\"sounds/custom\", exist_ok=True)\n    temp_path = \"sounds/custom/_preview.wav\"\n\n    status_label.configure(text=\"Идёт запись...\")\n    status_label.update_idletasks()\n\n    recording = sd.rec(\n        int(RECORD_SECONDS * SAMPLE_RATE),\n        samplerate=SAMPLE_RATE,\n        channels=1\n    )\n    sd.wait()\n    sf.write(temp_path, recording, SAMPLE_RATE)\n\n    status_label.configure(text=\"Запись готова. Прослушай её.\")\n    return temp_path",
  "reveals": [
   "Создай файл recorder.py в корне SoundboardStudio — рядом с main.py.",
   "Вставь весь код целиком.",
   "Не помещай этот код в interface/controls.py."
  ]
 },
 {
  "kicker": "ПРОСЛУШИВАНИЕ",
  "title": "Читаем временную запись",
  "lead": "Чтобы прослушать запись, снова откроем WAV-файл через soundfile и передадим данные в sounddevice.",
  "code": "def play_preview(file_path):\n    data, samplerate = sf.read(file_path)\n    sd.play(data, samplerate)",
  "reveals": [
   "sf.read() возвращает звуковые данные и частоту.",
   "sd.play() запускает воспроизведение.",
   "Функция принимает путь к временному файлу."
  ]
 },
 {
  "kicker": "ОТМЕНА",
  "title": "Удаляем временную запись",
  "code": "def cancel_preview(file_path):\n    sd.stop()\n    if os.path.exists(file_path):\n        os.remove(file_path)",
  "reveals": [
   "sd.stop() останавливает прослушивание, если оно ещё идёт.",
   "os.path.exists() проверяет, существует ли файл.",
   "os.remove() удаляет временную запись.",
   "Если пользователь отменил запись, файл не останется в коллекции."
  ]
 },
 {
  "kicker": "СОХРАНЕНИЕ",
  "title": "Перемещаем запись в коллекцию",
  "lead": "Если запись понравилась, сохраним её под постоянным именем. Если файл с таким именем уже существует, подберём свободный номер.",
  "code": "def save_preview(file_path):\n    number = 1\n    final_path = \"sounds/custom/recording.wav\"\n\n    while os.path.exists(final_path):\n        final_path = (\n            \"sounds/custom/recording_\"\n            + str(number) + \".wav\"\n        )\n        number += 1\n\n    os.replace(file_path, final_path)\n    return final_path",
  "reveals": [
   "Сначала пробуем имя recording.wav.",
   "Если оно занято, проверяем recording_1.wav, recording_2.wav и так далее.",
   "os.replace() перемещает временный файл под постоянным именем.",
   "Функция возвращает путь к сохранённому WAV-файлу."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ МОДУЛЬ",
  "title": "Обнови recorder.py целиком",
  "code": "import os\nimport sounddevice as sd\nimport soundfile as sf\n\nRECORD_SECONDS = 5\nSAMPLE_RATE = 44100\n\n\ndef record_audio(status_label):\n    os.makedirs(\"sounds/custom\", exist_ok=True)\n    temp_path = \"sounds/custom/_preview.wav\"\n\n    status_label.configure(text=\"Идёт запись...\")\n    status_label.update_idletasks()\n\n    recording = sd.rec(\n        int(RECORD_SECONDS * SAMPLE_RATE),\n        samplerate=SAMPLE_RATE,\n        channels=1\n    )\n    sd.wait()\n    sf.write(temp_path, recording, SAMPLE_RATE)\n\n    status_label.configure(text=\"Запись готова. Прослушай её.\")\n    return temp_path\n\n\ndef play_preview(file_path):\n    data, samplerate = sf.read(file_path)\n    sd.play(data, samplerate)\n\n\ndef cancel_preview(file_path):\n    sd.stop()\n    if os.path.exists(file_path):\n        os.remove(file_path)\n\n\ndef save_preview(file_path):\n    number = 1\n    final_path = \"sounds/custom/recording.wav\"\n\n    while os.path.exists(final_path):\n        final_path = (\n            \"sounds/custom/recording_\"\n            + str(number) + \".wav\"\n        )\n        number += 1\n\n    os.replace(file_path, final_path)\n    return final_path",
  "reveals": [
   "Файл recorder.py содержит четыре функции: запись, прослушивание, отмену и сохранение.",
   "Все они работают с временным WAV-файлом.",
   "Сохранённый файл остаётся в sounds/custom."
  ]
 },
 {
  "kicker": "ПОДКЛЮЧАЕМ ЗАПИСЬ К ОКНУ",
  "title": "Что изменится в controls.py?",
  "lead": "В нижней панели появится кнопка «Записать звук». После записи вместо неё покажем кнопки прослушивания, повторной записи, сохранения и отмены.",
  "items": [
   {
    "title": "Записать",
    "text": "Создаёт новую временную запись."
   },
   {
    "title": "Прослушать",
    "text": "Запускает временный WAV."
   },
   {
    "title": "Повторить",
    "text": "Удаляет старую временную запись и начинает новую."
   },
   {
    "title": "Сохранить / Отменить",
    "text": "Оставляет запись в sounds/custom или удаляет временный файл."
   }
  ]
 },
 {
  "kicker": "ФАЙЛ CONTROLS.PY",
  "title": "Подключаем функции recorder.py",
  "code": "from recorder import (\n    record_audio,\n    play_preview,\n    cancel_preview,\n    save_preview\n)",
  "reveals": [
   "Добавь импорт в начало interface/controls.py.",
   "Функции находятся в корневом файле recorder.py.",
   "Путь начинается с recorder, без папки interface."
  ]
 },
 {
  "kicker": "КНОПКА ЗАПИСИ",
  "title": "Запускаем запись по нажатию",
  "code": "def start_recording():\n    try:\n        preview_path = record_audio(status_label)\n        show_preview_controls()\n    except Exception as error:\n        status_label.configure(\n            text=\"Не удалось записать звук. Проверь микрофон.\"\n        )\n        print(\"Ошибка записи:\", error)",
  "reveals": [
   "Запись запускается только после нажатия кнопки.",
   "try/except помогает обработать отсутствие микрофона или запрет доступа.",
   "После успешной записи показываем кнопки управления временным файлом."
  ]
 },
 {
  "kicker": "ПРОСЛУШИВАНИЕ",
  "title": "Добавляем обработчик кнопки",
  "code": "def listen_recording():\n    try:\n        play_preview(preview_path)\n        status_label.configure(text=\"Прослушивание записи\")\n    except Exception as error:\n        status_label.configure(text=\"Не удалось прослушать запись\")\n        print(\"Ошибка прослушивания:\", error)",
  "reveals": [
   "Обработчик вызывает play_preview().",
   "После запуска меняет строку состояния.",
   "Если файл не удалось прочитать, пользователь увидит понятное сообщение."
  ]
 },
 {
  "kicker": "ПОВТОРНАЯ ЗАПИСЬ",
  "title": "Удаляем старую и записываем новую",
  "code": "def repeat_recording():\n    cancel_preview(preview_path)\n    start_recording()",
  "reveals": [
   "Старая временная запись удаляется.",
   "Затем снова запускается start_recording().",
   "Пользователь может повторять запись, пока не получит подходящий результат."
  ]
 },
 {
  "kicker": "СОХРАНЕНИЕ ЗАПИСИ",
  "title": "Добавляем запись в список звуков",
  "code": "def save_recording():\n    final_path = save_preview(preview_path)\n    sounds.append({\n        \"name\": \"Моя запись\",\n        \"path\": final_path\n    })\n    refresh_sounds()\n    show_main_controls()\n    status_label.configure(text=\"Запись добавлена в коллекцию\")",
  "reveals": [
   "save_preview() переносит файл в постоянное место.",
   "Создаём словарь с названием и путём.",
   "Добавляем словарь в общий список sounds.",
   "refresh_sounds() показывает новую карточку.",
   "Пока имя стандартное — ввод собственного названия будет на следующем занятии."
  ]
 },
 {
  "kicker": "ОТМЕНА ЗАПИСИ",
  "title": "Удаляем временный файл",
  "code": "def cancel_recording():\n    cancel_preview(preview_path)\n    show_main_controls()\n    status_label.configure(text=\"Запись отменена\")",
  "reveals": [
   "Временный файл удаляется.",
   "Новая карточка в коллекции не появляется.",
   "Пользователь возвращается к обычным кнопкам панели."
  ]
 },
 {
  "kicker": "ИНТЕРФЕЙС",
  "title": "Показываем нужные кнопки",
  "lead": "В controls.py понадобятся две небольшие функции: одна показывает обычную кнопку записи, вторая — действия с готовой временной записью.",
  "code": "def show_main_controls():\n    for widget in controls.winfo_children():\n        widget.destroy()\n    record_button = ctk.CTkButton(\n        controls, text=\"● Записать звук\", command=start_recording\n    )\n    record_button.pack(side=\"left\", padx=12, pady=12)\n\n\ndef show_preview_controls():\n    for widget in controls.winfo_children():\n        widget.destroy()\n\n    ctk.CTkButton(controls, text=\"▶ Прослушать\", command=listen_recording).pack(side=\"left\", padx=5, pady=12)\n    ctk.CTkButton(controls, text=\"↻ Повторить\", command=repeat_recording).pack(side=\"left\", padx=5, pady=12)\n    ctk.CTkButton(controls, text=\"Сохранить\", command=save_recording).pack(side=\"left\", padx=5, pady=12)\n    ctk.CTkButton(controls, text=\"Отменить\", command=cancel_recording).pack(side=\"left\", padx=5, pady=12)",
  "reveals": [
   "Обе функции очищают нижнюю панель от старых кнопок.",
   "Затем создают нужный набор кнопок.",
   "Команда каждой кнопки связана с обработчиком через command."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ ФАЙЛ",
  "title": "Сохрани interface/controls.py целиком",
  "code": "import customtkinter as ctk\n\nfrom recorder import (\n    record_audio,\n    play_preview,\n    cancel_preview,\n    save_preview\n)\n\n\ndef create_controls(parent, sounds, refresh_sounds, status_label):\n    controls = ctk.CTkFrame(parent, corner_radius=16)\n    controls.pack(fill=\"x\", padx=24, pady=(0, 24))\n\n    preview_path = None\n\n    def start_recording():\n        nonlocal preview_path\n        try:\n            preview_path = record_audio(status_label)\n            show_preview_controls()\n        except Exception as error:\n            status_label.configure(text=\"Не удалось записать звук. Проверь микрофон.\")\n            print(\"Ошибка записи:\", error)\n\n    def listen_recording():\n        try:\n            play_preview(preview_path)\n            status_label.configure(text=\"Прослушивание записи\")\n        except Exception as error:\n            status_label.configure(text=\"Не удалось прослушать запись\")\n            print(\"Ошибка прослушивания:\", error)\n\n    def repeat_recording():\n        cancel_preview(preview_path)\n        start_recording()\n\n    def save_recording():\n        final_path = save_preview(preview_path)\n        sounds.append({\"name\": \"Моя запись\", \"path\": final_path})\n        refresh_sounds()\n        show_main_controls()\n        status_label.configure(text=\"Запись добавлена в коллекцию\")\n\n    def cancel_recording():\n        cancel_preview(preview_path)\n        show_main_controls()\n        status_label.configure(text=\"Запись отменена\")\n\n    def show_main_controls():\n        for widget in controls.winfo_children():\n            widget.destroy()\n        record_button = ctk.CTkButton(\n            controls, text=\"● Записать звук\", command=start_recording\n        )\n        record_button.pack(side=\"left\", padx=12, pady=12)\n\n    def show_preview_controls():\n        for widget in controls.winfo_children():\n            widget.destroy()\n\n        ctk.CTkButton(controls, text=\"▶ Прослушать\", command=listen_recording).pack(side=\"left\", padx=5, pady=12)\n        ctk.CTkButton(controls, text=\"↻ Повторить\", command=repeat_recording).pack(side=\"left\", padx=5, pady=12)\n        ctk.CTkButton(controls, text=\"Сохранить\", command=save_recording).pack(side=\"left\", padx=5, pady=12)\n        ctk.CTkButton(controls, text=\"Отменить\", command=cancel_recording).pack(side=\"left\", padx=5, pady=12)\n\n    show_main_controls()",
  "reveals": [
   "Полностью замени содержимое interface/controls.py.",
   "В этом файле теперь и импорт WAV, и запись с микрофона временно сосредоточены в одной панели.",
   "Функция show_main_controls() создаёт кнопку записи при запуске.",
   "После записи появляется набор действий с временным WAV-файлом."
  ]
 },
 {
  "kicker": "ФАЙЛ WINDOW.PY",
  "title": "Оставляем подключение панели управления",
  "lead": "В window.py передаём в controls.py тот же список sounds и функцию обновления карточек. Дополнительные изменения здесь не нужны, если ты сохранил версию с прошлого занятия.",
  "code": "create_controls(\n    app, sounds, refresh_sounds, status_label\n)",
  "reveals": [
   "Этот вызов уже есть в interface/window.py после занятия 33.",
   "Проверь, что он находится внутри create_window().",
   "Не добавляй второй вызов create_controls()."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ СЦЕНАРИЙ",
  "title": "Как работает запись от начала до конца?",
  "list": [
   "Нажимаем «Записать звук».",
   "Появляется сообщение «Идёт запись...».",
   "Через пять секунд временный WAV готов.",
   "Можно прослушать его или записать заново.",
   "«Сохранить» добавляет файл и карточку в список sounds.",
   "«Отменить» удаляет временный файл и возвращает обычную кнопку."
  ]
 },
 {
  "kicker": "ПРОВЕРКА",
  "title": "Проведи три испытания",
  "items": [
   {
    "title": "Успешная запись",
    "text": "Запиши звук, прослушай и сохрани. Новая карточка должна появиться в панели."
   },
   {
    "title": "Повторная запись",
    "text": "Запиши звук, нажми «Повторить» и сделай новую запись. Сохрани только вторую."
   },
   {
    "title": "Отмена",
    "text": "Запиши звук и нажми «Отменить». Временная запись не должна попасть в список."
   }
  ]
 },
 {
  "kicker": "ЕСЛИ ВОЗНИКЛА ОШИБКА",
  "title": "Что проверить?",
  "items": [
   {
    "title": "Нет доступа к микрофону",
    "text": "Проверь разрешения операционной системы и настройки микрофона."
   },
   {
    "title": "Ошибка устройства ввода",
    "text": "Убедись, что микрофон подключён и выбран по умолчанию."
   },
   {
    "title": "Не найден recorder",
    "text": "Файл recorder.py должен лежать рядом с main.py, а не внутри interface."
   },
   {
    "title": "Запись не появилась в карточках",
    "text": "Проверь sounds.append(...) и вызов refresh_sounds()."
   }
  ]
 },
 {
  "kicker": "ПРАКТИКА · БАЗОВЫЙ",
  "title": "Запиши и сохрани звук",
  "list": [
   "Нажми «Записать звук».",
   "Произнеси короткую фразу или хлопни в ладоши.",
   "Прослушай результат.",
   "Сохрани запись и проверь новую карточку."
  ]
 },
 {
  "kicker": "ПРАКТИКА · УЛУЧШЕННЫЙ",
  "title": "Проверь повтор и отмену",
  "list": [
   "Сделай запись и прослушай её.",
   "Повтори запись и сравни результаты.",
   "Сделай ещё одну запись и отмени её.",
   "Убедись, что отменённый звук не появился в коллекции."
  ]
 },
 {
  "kicker": "ПРАКТИКА · ТВОРЧЕСКИЙ",
  "title": "Придумай свой сценарий записи",
  "list": [
   "Запиши короткий звуковой эффект.",
   "Попробуй записать голос с разной громкостью.",
   "Подумай, какое сообщение показывать во время записи.",
   "Не увеличивай длительность больше пяти секунд."
  ]
 },
 {
  "kicker": "ИТОГ ЗАНЯТИЯ",
  "title": "Теперь Soundboard Studio умеет записывать!",
  "list": [
   "Подключили микрофон через sounddevice.",
   "Ограничили запись пятью секундами.",
   "Сохранили временный WAV через soundfile.",
   "Добавили прослушивание и повторную запись.",
   "Реализовали сохранение и отмену.",
   "Добавили сохранённый звук в общий список карточек."
  ]
 },
 {
  "kicker": "СЛЕДУЮЩЕЕ ЗАНЯТИЕ",
  "title": "Научимся управлять коллекцией",
  "lead": "На следующем занятии добавим ввод названия, переименование и удаление звуков. Сохраним список коллекции в JSON и научимся загружать его при запуске приложения.",
  "note": "Сейчас звуки живут в списке только до закрытия программы. На занятии 35 научим приложение их запоминать."
 }
];
