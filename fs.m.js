const mavka = getMavka();
const context = getContext();

import fs from "fs";

function isExists (path) {
	try {
		return fs.existsSync(path);
	} catch (error) {
		throw error;
	}
}

function pathStats (path) {
	try {
		return fs.statSync(path);
	} catch (error) {
		throw error;
	}
}

function isStats (path) {
	try {
		const stats = pathStats(path);

		return {
			...stats,
			isFile: stats.isFile(),
			isDirectory: stats.isDirectory(),
			isSymbolic: stats.isSymbolicLink(),
			isFIFO: stats.isFIFO(),
			isSocket: stats.isSocket()
		}
	} catch (error) {
		throw error;
	}
}


context.set("чи_існує_шлях", mavka.makeWrappedProxyFunction(([path]) => {
	if (!(typeof path == 'string'))
		return mavka.fall(context, mavka.makeText("шлях не є текстом"));

	try {
		return mavka.toCell(isExists());
	} catch (error) {
		return mavka.fall(context, mavka.makeText(`не вдалось виконати дію: ${error.message || error.value?.properties?.value}`));
	}
}));


context.set("створити_директорію", mavka.makeWrappedProxyFunction(([path]) => {
	try {
		if (!(typeof path == 'string'))
			return mavka.fall(context, mavka.makeText("шлях не є текстом"));

		if (isExists(path))
			return mavka.fall(context, mavka.makeText("тека вже існує"));

		fs.mkdirSync(path);

	} catch (error) {
		return mavka.fall(context, mavka.makeText(`не вдалось виконати дію: ${error.message || error.value?.properties?.value}`));
	}
}));

context.set("читати_директорію", mavka.makeWrappedProxyFunction(([path]) => {
	try {	
		if (!(typeof path == 'string'))
			return mavka.fall(context, mavka.makeText("шлях не є текстом"));

		if (!isExists(path))
			return mavka.fall(context, mavka.makeText("теки за данним шляхом не існує"));

		if (!isStats(path).isDirectory)
			return mavka.fall(context, mavka.makeText("за вказаним шляхом знаходиться не тека"));

		return mavka.makePortalList(fs.readdirSync(path));

	} catch (error) {
		return mavka.fall(context, mavka.makeText(`не вдалось виконати дію: ${error.message || error.value?.properties?.value}`));
	}
}));

context.set("видалити_директорію", mavka.makeWrappedProxyFunction(([path, recursive]) => {
	try {
		if (!(typeof path == 'string'))
			return mavka.fall(context, mavka.makeText("шлях не є текстом"));

		if (!(typeof recursive == 'boolean'))
			return mavka.fall(context, mavka.makeText("значення рекурсивно не є булевим"))

		if (!isExists(path))
			return mavka.fall(context, mavka.makeText("теки за данним шляхом не існує"));

		if (!isStats(path).isDirectory)
			return mavka.fall(context, mavka.makeText("за вказаним шляхом знаходиться не тека"));

		fs.rmdirSync(path, {recursive: recursive})
	}
	catch (error) {
		return mavka.fall(context, mavka.makeText(`не вдалось виконати дію: ${error.message || error.value?.properties?.value}`));
	}
}));

context.set("повернути_властивості", mavka.makeWrappedProxyFunction(([path]) => {
	try {
		if (!(typeof path == 'string'))
			return mavka.fall(context, mavka.makeText("шлях не є текстом"));

		if (!isExists(path))
			return mavka.fall(context, mavka.makeText("за данним шляхом нічого немає"));

		const stats = isStats(path);

		return mavka.makePortalList(Object.entries(stats));
	} catch (error) {
		return mavka.fall(context, mavka.makeText(`не вдалось виконати дію: ${error.message || error.value?.properties?.value}`));
	}
}));

context.set("створити_файл", mavka.makeWrappedProxyFunction(([path, data]) => {
	try {
		if (!(typeof path == 'string'))
			return mavka.fall(context, mavka.makeText("шлях не є текстом"));

		if (isExists(path))
			return mavka.fall(context, mavka.makeText("такий файл уже існує"));

		fs.appendFileSync(path, Buffer.from(data));
	} catch (error) {
		return mavka.fall(context, mavka.makeText(`не вдалось виконати дію: ${error.message || error.value?.properties?.value}`));
	}
}));

context.set("записати_в_файл", mavka.makeWrappedProxyFunction(([path, data]) => {
	try {
		if (!(typeof path == 'string'))
			return mavka.fall(context, mavka.makeText("шлях не є текстом"));

		if (!isExists(path))
			return mavka.fall(context, mavka.makeText("такого файлу не існує"));

		if (!isStats(path).isFile)
			return mavka.fall(context, mavka.makeText("за вказаним шляхом знаходиться не файл"));

		fs.writeFileSync(path, Buffer.from(data));
	} catch (error) {
		return mavka.fall(context, mavka.makeText(`не вдалось виконати дію: ${error.message || error.value?.properties?.value}`));
	}
}));

context.set("зчитати_данні_з_файлу", mavka.makeWrappedProxyFunction(([path]) => {
	try {
		if (!(typeof path == 'string'))
			return mavka.fall(context, mavka.makeText("шлях не є текстом"));

		if (!isExists(path))
			return mavka.fall(context, mavka.makeText("такого файлу не існує"));

		if (!isStats(path).isFile)
			return mavka.fall(context, mavka.makeText("за вказаним шляхом знаходиться не файл"));

		const buff = fs.readFileSync(path);

		return mavka.toCell(buff.toString());
	}
	catch (error) {
		return mavka.fall(context, mavka.makeText(`не вдалось виконати дію: ${error.message || error.value?.properties?.value}`));
	}
}));

context.set('видалити_файл', mavka.makeWrappedProxyFunction(([path]) => {
	try {
		if (!(typeof path == 'string'))
			return mavka.fall(context, mavka.makeText("шлях не є текстом"));

		if (!isExists(path))
			return mavka.fall(context, mavka.makeText("такого файлу не існує"));
		
		if (!isStats(path).isFile)
			return mavka.fall(context, mavka.makeText("за вказаним шляхом знаходиться не файл"));

		fs.rmSync(path)
	}
	catch (error) {
		return mavka.fall(context, mavka.makeText(`не вдалось виконати дію: ${error.message || error.value?.properties?.value}`));
	}
}))

await mavka.eval(`
	модуль ФС
		модуль Шлях
			структура Властивості
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
			кінець

			дія чи_існує(шлях)
				вернути чи_існує_шлях(шлях)
			кінець

			дія якщо_існує(шлях, зворот_виклик Дія)
				якщо зворот_виклик не є Дія
					впасти "зворот_виклик не є дією"
				кінець

				існує = чи_існує_шлях(шлях)

				зворот_виклик(існує)
			кінець

			дія повернути_властивості_шляху(шлях)
				властивості_шляху = ()
				масив_властивостей = []

				портал_властивостей = повернути_властивості(шлях)

				перебрати портал_властивостей як елемент
					перебрати елемент як ключ
						масив_властивостей.додати(ключ)
					кінець
				кінець

				перебрати діапазон(0, масив_властивостей.довжина(), 2) як ключ
					властивості_шляху.покласти(масив_властивостей[ключ], масив_властивостей[ключ+1])
				кінець

				вернути властивості_шляху
			кінець

			дія властивості_та_виконати(шлях, зворот_виклик Дія)
				якщо зворот_виклик не є Дія
					впасти "зворот_виклик не є дією"
				кінець

				властивості = властивості(шлях)

				зворот_виклик(властивості)
			кінець

			дія властивості(шлях)
				властивості = повернути_властивості_шляху(шлях)

				об'єкт_властивостей = Властивості(
					пристрій=властивості["dev"],
					режим=властивості["mode"],
					жорсткі_посилання=властивості["nlink"],
					юзер_айді=властивості["uid"],
					груп_айді=властивості["gid"],
					пристрій_айді=властивості["rdev"],
					розмір=властивості["size"],
					розмір_блоку=властивості["blksize"],
					блоки=властивості["bloks"],
					останній_доступ=властивості["atimeMs"],
					відредаговано_востаннє=властивості["mtimeMs"],
					відредаговано_статус_файлу=властивості["ctimeMs"],
					створено=властивості["birthtimeMs"],
					це_файл=властивості["isFile"],
					це_тека=властивості["isDirectory"],
					це_посилання=властивості["isSymbolic"],
					це_сокет=властивості["isSocket"],
					це_канал=властивості["isFIFO"]
				)

				вернути об'єкт_властивостей
			кінець

			дати чи_існує
			дати якщо_існує
			дати властивості
			дати властивості_та_виконати
		кінець

		модуль Тека
			дія створити_теку(шлях)
				створити_директорію(шлях)
			кінець

			дія створити_теку_та_виконати(шлях, зворот_виклик Дія)
				якщо зворот_виклик не є Дія
					впасти "зворот_виклик не є дією"
				кінець

				створити_теку(шлях)
				зворот_виклик()
			кінець

			дія читати_теку(шлях)
				портал_данних = читати_директорію(шлях)

				файли_і_теки = []

				перебрати портал_данних як елемент
					файли_і_теки.додати(елемент)
				кінець

				вернути файли_і_теки
			кінець

			дія читати_теку_та_виконати(шлях, зворот_виклик Дія)
				якщо зворот_виклик не є Дія
					впасти "зворот_виклик не є дією"
				кінець

				зворот_виклик(читати_теку(шлях))
			кінець

			дія видалити_теку(шлях, рекурсивно)
				видалити_директорію(шлях, рекурсивно)
			кінець

			дія видалити_теку_та_виконати(шлях, рекурсивно, зворот_виклик Дія)
				якщо зворот_виклик не є Дія
					впасти "зворот_виклик не є дією"
				кінець

				видалити_теку(шлях, рекурсивно)
				зворот_виклик()
			кінець

			дати читати_теку
			дати створити_теку
			дати видалити_теку
			дати читати_теку_та_виконати
			дати створити_теку_та_виконати
			дати видалити_теку_та_виконати
		кінець

		модуль Файл
			дія створити_та_записати(шлях, данні)
				створити_файл(шлях, данні)
			кінець

			дія створити_записати_та_виконати(шлях, данні, зворот_виклик Дія)
				якщо зворот_виклик не є Дія
					впасти "зворот_виклик не є дією"
				кінець

				створити_та_записати(шлях, данні)
				зворот_виклик()
			кінець

			дія записати_в(шлях, данні)
				записати_в_файл(шлях, данні)
			кінець

			дія записати_та_виконати(шлях, данні, зворот_виклик Дія)
				якщо зворот_виклик не є Дія
					впасти "зворот_виклик не є дією"
				кінець

				записати_в(шлях, данні)
				зворот_виклик()
			кінець

			дія зчитати_з(шлях)
				вернути зчитати_данні_з_файлу(шлях)
			кінець

			дія зчитати_та_виконати(шлях, зворот_виклик Дія)
				якщо зворот_виклик не є Дія
					впасти "зворот_виклик не є дією"
				кінець

				зчитане = зчитати_з(шлях)

				зворот_виклик(зчитане)
			кінець

			дія видалити(шлях)
				видалити_файл(шлях)
			кінець

			дія видалити_та_виконати(шлях, зворот_виклик Дія)
				якщо зворот_виклик не є Дія
					впасти "зворот_виклик не є дією"
				кінець

				видалити(шлях)
				зворот_виклик()
			кінець

			дати видалити
			дати зчитати_з
			дати записати_в
			дати зчитати_та_виконати
			дати видалити_та_виконати
			дати створити_записати_та_виконати
		кінець

		дати Тека
		дати Шлях
		дати Файл
	кінець

	дати ФС
	`, context);