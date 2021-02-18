var datos = {
	"conjuntos" : 
	{
		"suciedad" : 
		{
				"poca" : { "min" : 0, "max" : 50, "func" : "hd"},
				"media" : { "min" : 0 , "max" : 100, "nucleo" : 50, "func" : "triangular"},
				"mucha" : { "min" : 50 , "max" : 100, "func" : "hi"},
		},
		"grasa" : 
		{
				"poca" : { "min" : 0, "max" : 50, "func" : "hd"},
				"media" : { "min" : 0 , "max" : 100, "nucleo" : 50, "func" : "triangular"},
				"mucha" : { "min" : 50 , "max" : 100, "func" : "hi"},
		},
		"tiempo" : 
		{
				"muy_corto" : { "min" : 0, "max" : 10, "func" : "hd"},
				"corto" : { "min" : 0 , "max" : 25, "nucleo" : 12.5, "func" : "triangular"},
				"medio" : { "min" : 10 , "max" : 40, "nucleo" : 25, "func" : "triangular"},
				"largo" : { "min" : 25 , "max" : 60, "nucleo" : 42.5, "func" : "triangular"},
				"muy_largo" : { "min" : 40 , "max" : 60, "func" : "hi"}
		}
	},
	"reglas" :
	{
		"r1" : {"suciedad" : "poca", "grasa" : "poca", "tiempo" : "muy_corto"},
		"r2" : {"suciedad" : "poca", "grasa" : "media", "tiempo" : "medio"},
		"r3" : {"suciedad" : "poca", "grasa" : "mucha", "tiempo" : "largo"},
		"r4" : {"suciedad" : "media", "grasa" : "poca", "tiempo" : "corto"},
		"r5" : {"suciedad" : "media", "grasa" : "media", "tiempo" : "medio"},
		"r6" : {"suciedad" : "media", "grasa" : "mucha", "tiempo" : "largo"},
		"r7" : {"suciedad" : "mucha", "grasa" : "poca", "tiempo" : "medio"},
		"r8" : {"suciedad" : "mucha", "grasa" : "media", "tiempo" : "largo"},
		"r9" : {"suciedad" : "mucha", "grasa" : "mucha", "tiempo" : "muy_largo"}
	}
}

function calcularGradoPertenencia(a,b,m,func,x)
{
	switch(func)
	{
		case "triangular":
			if(x < a)
			{
				return 0;
			}
			else if (a < x && x <= m)
			{
				return (x - a) / (m - a);
			}
			else if (m < x && x < b)
			{
				return (b - x) / (b - m);
			}
			else if(x >= b)
			{
				return 0;
			}
		break;
		case "hi":
			if(x <= a)
			{
				return 1;
			}
			else if (a <= x && x <= b)
			{
				return (x - a) / (b - a);
			}
			else if(x <= b)
			{
				return 0;
			}
		break;
		case "hd":
			if(x <= a)
			{
				return 0;
			}
			else if (a <= x && x <= b)
			{
				return (x - b) / (a - b);
			}
			else if(x <= b)
			{
				return 1;
			}
		break;
	}	
}

function obtenerGradoSuciedad(suc = 60)
{
	let suciedadPoca = datos.conjuntos.suciedad.poca;
	let suciedadMedia = datos.conjuntos.suciedad.media;
	let suciedadMucha = datos.conjuntos.suciedad.mucha;
	let gradoSuciedadPoca = calcularGradoPertenencia(suciedadPoca.min,suciedadPoca.max,suciedadPoca.nucleo,suciedadPoca.func,suc);
	let gradoSuciedadMedia = calcularGradoPertenencia(suciedadMedia.min,suciedadMedia.max,suciedadMedia.nucleo,suciedadMedia.func,suc);
	let gradoSuciedadMucha = calcularGradoPertenencia(suciedadMucha.min,suciedadMucha.max,suciedadMucha.nucleo,suciedadMucha.func,suc);
	console.log(gradoSuciedadPoca)
	console.log(gradoSuciedadMedia)
	console.log(gradoSuciedadMucha)
}

function obtenerGradoGrasa(suc = 70)
{
	let grasaPoca = datos.conjuntos.grasa.poca;
	let grasaMedia = datos.conjuntos.grasa.media;
	let grasaMucha = datos.conjuntos.grasa.mucha;
	let gradoGrasaPoca = calcularGradoPertenencia(grasaPoca.min,grasaPoca.max,grasaPoca.nucleo,grasaPoca.func,suc);
	let gradoGrasaMedia = calcularGradoPertenencia(grasaMedia.min,grasaMedia.max,grasaMedia.nucleo,grasaMedia.func,suc);
	let gradoGrasaMucha = calcularGradoPertenencia(grasaMucha.min,grasaMucha.max,grasaMucha.nucleo,grasaMucha.func,suc);
	console.log(gradoGrasaPoca)
	console.log(gradoGrasaMedia)
	console.log(gradoGrasaMucha)
}

function recorrerReglas()
{
	for(let regla in datos.reglas)
	{
		console.log(datos.reglas[regla].suciedad);
	}
}