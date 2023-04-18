# Файлова система

# Зміст
- [Опис](#Опис)
- [Встановлення](#встановлення)
- [Приклади](#приклади-використання)
- [Довідка](#довідка-з-розширення)

# Опис
Файлова Система (скорочено ФС) - розширення, яке допоможе вам створювати, видаляти та читати файли і теки

# Встановлення 

Додайте до вашого .м файлу наступний рядок

```
;; важливо додавати його на самому початку вашого файлу
взяти "хмарний.пак.укр/мавка_фс/0.0.6"
```

# Приклади використання

```
взяти "хмарний.пак.укр/мавка_фс/0.0.6"

;; наш шлях буде таким
шлях = "супер пупер"

;; перевірка наявності файлу або теки

я_існую = фс.шлях.перевірити_існування(шлях) ;; поверне так чи ні

;; або

дія якщо_шлях(існує)
	якщо існує
		друк("шлях існує")
	інакше
		друк("шляху не існує")
	кінець
кінець

фс.шлях.перевірити_існування_та_виконати(шлях, якщо_шлях)

;; отримання властивостей файлу або теки

властивості = фс.шлях.властивості(шлях) ;; поверне екземпляр структури Властивості

;; або
	
дія повернути_властивості(властивості)
	друк(властивості)
кінець

фс.шлях.властивості_та_виконати(шлях, повернути_властивості)

;; створення/читання/видалення тек

фс.тека.створити_теку(шлях) ;; створює теку за вказаним шляхом

фс.тека.видалити_теку(шлях, так) ;; видаляє теку рекурсивно. не варто видаляти непусту теку не рекурсивно, бо можеш отримати виключення

;; можна зробити так

дія видалено_або_створено()
	друк ("теку було створено або видалено")	
кінець

фс.тека.створити_теку_та_виконати(шлях, видалено_або_створено)
фс.тека.видалити_теку_та_виконати(шлях, так, видалено_або_створено)

;; тепер йдемо до зчитування теки

прочитана_тека = фс.тека.читати_теку() ;; повертає масив з елементами, що знаходяться в теці. це можуть бути, як файли, так і теки

;; можна зробити так

дія прочитана(елементи)
	перебрати елементи як елемент
		друк(елемент)
	кінець
кінець

фс.тека.чиати_теку_та_виконати(шлях, прочитана)

;; створення/читання/запис/видалення файлів

фс.файл.створити_та_записати(шлях, "якийсь текст") ;; створює файлм за вказаним шляхом і записує данні
фс.файл.записати_в(шлях "якийсь інший текст") ;; записує данні в уже існуючий файл
фс.файл.видалити(шлях) ;; видаляє існуючий файл

;; можна зробити так

дія зміни()
	друк("файл створено, змінено чи видалено")
кінець

фс.файл.створити_записати_та_виконати(шлях, зміни)
фс.файл.записати_та_виконати(шлях, зміни)
фс.файл.видалити_та_виконати(шлях, зміни)

;; зчитування файлу

зчитане = фс.файл.зчитати_з(шлях) ;; повертає данні у вигляді тексту

;; можна ще зробити так

дія прочитано(данні)
	друк(данні)
кінець

фс.файл.зчитати_та_виконати(шлях, прочитано)
```

# Довідка з розширення
```
Модуль фс - головний модуль розширення
	константи - константи, необхідні для перевірок доступу (див https://nodejs.org/api/fs.html#fsconstants)
	Модуль шлях - відповідає за методами і властивостями, які взаємодіють зі шляхом загалом (тобто незалежно від того, чи шлях є файлом, чи текою)

		дія перевірити_існування(шлях текст) логічне - перевіряє, чи існує щось за вказаним шляхом.

		дія перевірити_існування_та_виконати(шлях текст, зворот_виклик Дія) пусто - перевіряє, чи існує щось за вказаним шляхом, а потім передає аргументи в 
		зворот_виклик

		дія властивості(шлях текст) Властивості - повертає властивості теки чи файлу за вказаним шляхом. 

		дія властивості_та_виконати(шлях текст, зворот_виклик Дія) пусто - повертає властивості теки чи файлу за вказаним шляху у зворот_виклик

		структура Властивості - структура, яка відповідає за властивості файлу або теки
			пристрій число
			режим число
			жорсткі_посилання число
			юзер_айді число
			груп_айді число
			пристрій_айді число
			розмір число
			розмір_блоку число
			блоки число
			останній_доступ число
			відредаговано_востаннє число
			відредаговано_статус_файлу число
			створено число
			це_файл логічне
			це_тека логічне
			це_сокет логічне
			це_посилання логічне
			це_канал логічне

	Модуль тека - відповідає за методами і властивостями, які взаємодіють з теками

		дія створити_теку(шлях текст) пусто - створює теку за вказаним шляхом, якщо її не існує

		дія створити_теку_та_виконати(шлях текст, зворот_виклик Дія) пусто - створює теку за вказаним шляхом, якщо її не існує, і виконує зворот_виклик

		дія читати_теку(шлях текст) список - зчитує з теки всі наявні файли та теки за вказаним шляхом, якщо тека існує

		дія читати_теку_та_виконати(шлях текст, зворот_виклик Дія) пусто - зчитує з теки всі наявні файли та теки за вказаним шляхом, якщо тека існує, і повертає аргументи у зворот_виклик

		дія видалити_теку(шлях текст, рекурсивно логічне) пусто - видаляє теку за вказаним шляхом, якщо вона існує. аргумент "рекурсивно" потрібен для того щоб видалити теку рекурсивно (тобто з всіма наявними файлами та теками), або ні

		дія видалити_теку_та_виконати(шлях текст, рекурсивно логічне, зворот_виклик Дія) пусто - видаляє теку за вказаним шляхом, якщо вона існує, і потім викликає зворот_виклик. аргумент "рекурсивно" потрібен для того щоб видалити теку рекурсивно (тобто з всіма наявними файлами та теками), або ні

	Модуль файл - відповідає за методами і властивостями, які взаємодіють з файлами

		дія створити_та_записати(шлях текст, данні) пусто - створює файл за вказаним шляхом, якщо його не існує і записує данні, які були передані

		дія створити_записати_та_виконати(шлях текст, данні, зворот_виклик Дія) пусто - створює файл за вказаним шляхом, якщо його не існує і записує данні, які були передані

		дія записати_в(шлях текст, данні) пусто - записує в файл передані данні за шляхом, якщо він існує

		дія записати_та_виконати(шлях текст, данні, зворот_виклик Дія) пусто - записує в файл передані данні за шляхом, якщо він існує і виконує зворот_виклик

		дія зчитати_з(шлях текст) текст - зчитує файл із заданого шляху, якщо він існує

		дія зчитати_та_виконати(шлях текст, зворот_виклик Дія) пусто - зчитує файл із заданого шляху, якщо він існує, і передає данні в зворот_виклик

		дія видалити(шлях текст) пусто - видаляє файл за вказаним шляхом, якщо він існує

		дія видалити_та_виконати(шлях текст, зворот_виклик ДІя) пусто - видаляє файл за вказаним шляхом, якщо він існує, і виконує зворот_виклик
	
```