let gradoSuciedadPoca;
let gradoSuciedadMedia;
let gradoSuciedadMucha;
let gradoGrasaPoca;
let gradoGrasaMedia;
let gradoGrasaMucha;
let Maximo;
let reglaMaxima;
let datos = {};
function setDefaultValues()
{
	gradoSuciedadPoca = 0;
	gradoSuciedadMedia = 0;
	gradoSuciedadMucha = 0;
	gradoGrasaPoca = 0;
	gradoGrasaMedia = 0;
	gradoGrasaMucha = 0;
	Maximo = 0;
	reglaMaxima = "";
	datos = {
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
			"r1" : {"activada": false, "valor": null, "suciedad" : "poca", "grasa" : "poca", "tiempo" : "muy_corto"},
			"r2" : {"activada": false, "valor": null, "suciedad" : "poca", "grasa" : "media", "tiempo" : "medio"},
			"r3" : {"activada": false, "valor": null, "suciedad" : "poca", "grasa" : "mucha", "tiempo" : "largo"},
			"r4" : {"activada": false, "valor": null, "suciedad" : "media", "grasa" : "poca", "tiempo" : "corto"},
			"r5" : {"activada": false, "valor": null, "suciedad" : "media", "grasa" : "media", "tiempo" : "medio"},
			"r6" : {"activada": false, "valor": null, "suciedad" : "media", "grasa" : "mucha", "tiempo" : "largo"},
			"r7" : {"activada": false, "valor": null, "suciedad" : "mucha", "grasa" : "poca", "tiempo" : "medio"},
			"r8" : {"activada": false, "valor": null, "suciedad" : "mucha", "grasa" : "media", "tiempo" : "largo"},
			"r9" : {"activada": false, "valor": null, "suciedad" : "mucha", "grasa" : "mucha", "tiempo" : "muy_largo"}
		}
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
				return 0;
			}
			else if (a <= x && x <= b)
			{
				return (x - a) / (b - a);
			}
			else if(x >= b)
			{
				return 1;
			}
		break;
		case "hd":
			if(x <= a)
			{
				return 1;
			}
			else if (a <= x && x <= b)
			{
				return (x - b) / (a - b);
			}
			else if(x >= b)
			{
				return 0;
			}
		break;
	}	
}

function obtenerGradoSuciedad(suc = 60)
{
	let suciedadPoca = datos.conjuntos.suciedad.poca;
	let suciedadMedia = datos.conjuntos.suciedad.media;
	let suciedadMucha = datos.conjuntos.suciedad.mucha;
	gradoSuciedadPoca = calcularGradoPertenencia(suciedadPoca.min,suciedadPoca.max,suciedadPoca.nucleo,suciedadPoca.func,suc);
	gradoSuciedadMedia = calcularGradoPertenencia(suciedadMedia.min,suciedadMedia.max,suciedadMedia.nucleo,suciedadMedia.func,suc);
	gradoSuciedadMucha = calcularGradoPertenencia(suciedadMucha.min,suciedadMucha.max,suciedadMucha.nucleo,suciedadMucha.func,suc);
	console.log("pocaSuciedad:" + gradoSuciedadPoca)
	console.log("mediaSuciedad:" + gradoSuciedadMedia)
	console.log("muchaSuciedad:" + gradoSuciedadMucha)
}

function obtenerGradoGrasa(suc = 70)
{
	let grasaPoca = datos.conjuntos.grasa.poca;
	let grasaMedia = datos.conjuntos.grasa.media;
	let grasaMucha = datos.conjuntos.grasa.mucha;
	gradoGrasaPoca = calcularGradoPertenencia(grasaPoca.min,grasaPoca.max,grasaPoca.nucleo,grasaPoca.func,suc);
	gradoGrasaMedia = calcularGradoPertenencia(grasaMedia.min,grasaMedia.max,grasaMedia.nucleo,grasaMedia.func,suc);
	gradoGrasaMucha = calcularGradoPertenencia(grasaMucha.min,grasaMucha.max,grasaMucha.nucleo,grasaMucha.func,suc);
	console.log("pocaGrasa:" + gradoGrasaPoca)
	console.log("mediaGrasa:" + gradoGrasaMedia)
	console.log("muchaGrasa:" + gradoGrasaMucha)
}

function recorrerReglas()
{
	for(let regla in datos.reglas)
	{
		switch(datos.reglas[regla].suciedad)
		{
			case "poca":
				switch(datos.reglas[regla].grasa)
				{
					case "poca":
						datos.reglas[regla].valor = Math.min(gradoSuciedadPoca,gradoGrasaPoca);
						if(datos.reglas[regla].valor > 0)
						{
						 	datos.reglas[regla].activada = true;
						}
					break;
					case "media":
						 datos.reglas[regla].valor = Math.min(gradoSuciedadPoca,gradoGrasaMedia);
						 if(datos.reglas[regla].valor > 0)
						 {
						 	datos.reglas[regla].activada = true;
						 }
					break;
					case "mucha":
						datos.reglas[regla].valor = Math.min(gradoSuciedadPoca,gradoGrasaMucha);
						if(datos.reglas[regla].valor > 0)
						{
						 	datos.reglas[regla].activada = true;
						}
					break;
					
				}
			break;
			case "media":
				switch(datos.reglas[regla].grasa)
				{
					case "poca":
						datos.reglas[regla].valor = Math.min(gradoSuciedadMedia,gradoGrasaPoca);
						if(datos.reglas[regla].valor > 0)
						{
						 	datos.reglas[regla].activada = true;
						}
					break;
					case "media":
						 datos.reglas[regla].valor = Math.min(gradoSuciedadMedia,gradoGrasaMedia);
						 if(datos.reglas[regla].valor > 0)
						 {
						 	datos.reglas[regla].activada = true;
						 }
					break;
					case "mucha":
						datos.reglas[regla].valor = Math.min(gradoSuciedadMedia,gradoGrasaMucha);
						if(datos.reglas[regla].valor > 0)
						{
						 	datos.reglas[regla].activada = true;
						}
					break;
					
				}
			break;
			case "mucha":
				switch(datos.reglas[regla].grasa)
				{
					case "poca":
						datos.reglas[regla].valor = Math.min(gradoSuciedadMucha,gradoGrasaPoca);
						if(datos.reglas[regla].valor > 0)
						{
						 	datos.reglas[regla].activada = true;
						}
					break;
					case "media":
						 datos.reglas[regla].valor = Math.min(gradoSuciedadMucha,gradoGrasaMedia);
						 if(datos.reglas[regla].valor > 0)
						 {
						 	datos.reglas[regla].activada = true;
						 }
					break;
					case "mucha":
						datos.reglas[regla].valor = Math.min(gradoSuciedadMucha,gradoGrasaMucha);
						if(datos.reglas[regla].valor > 0)
						{
						 	datos.reglas[regla].activada = true;
						}
					break;
					
				}
			break;
		}
	}
}

function obtenerMaximo(grasa,suciedad)
{
	obtenerGradoGrasa(grasa);
	obtenerGradoSuciedad(suciedad);
	recorrerReglas();

	for(let regla in datos.reglas)
	{
		if(datos.reglas[regla].activada == true)
		{
			if(datos.reglas[regla].valor > Maximo)
			{
				Maximo = datos.reglas[regla].valor;
				reglaMaxima = regla;
			}
		}
	}
	console.log("La regla con maxima puntuacion es la regla: " + reglaMaxima + " con un valor de: " + Maximo);
}

function despejarGradoPertenencia(a,b,m,func,x)
{
	switch(func)
	{
		case "triangular":
			let r1 = (x * (m -a)) + a;
			let r2 = b -(x * (b -m));
			console.log( "El resultado del tiempo es:" + ((r1 + r2) / 2));
		break;
		case "hi":
			console.log( "El resultado del tiempo es:" + ((x * (b - a)) + a));
		break;
		case "hd":
			console.log( "El resultado del tiempo es:" + ((x * (a - b)) + b));
		break;
	}
}

function calcular(grasa,suciedad)
{
	setDefaultValues();
	obtenerMaximo(grasa,suciedad);
	let n = datos.reglas[reglaMaxima].tiempo;
	let j = datos.conjuntos.tiempo[n];
	despejarGradoPertenencia(j.min, j.max,j.nucleo,j.func,Maximo);
}