function createDiv (parent) {
	let div = document.createElement('div');
	parent.appendChild(div);
}

function createTable (parent, columns, rows) {
	let table = document.createElement("table");

	for (let i = 0; i < rows; i++) {
		let tr = document.createElement("tr");

		for(let j = 0; j < columns; j++) {
			let td = document.createElement("td");
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	parent.appendChild(table);

}

function checkArr (arr) {
    for(let i = 0; i < arr.length; i++){//проверка строк
        for(let j = 1; j < arr[i].length; j++){
            if(arr[i][j] === false || arr[i][j - 1] === false)
                break;
            if(j == arr[i].length - 1)
                return true;
        }
    }
    for(let j = 0; j < arr[0].length; j++){//проверка столбцов
        for(let i = 1; i < arr.length; i++){
            if(arr[i][j] === false || arr[i - 1][j] === false)
                break;
            if(i == arr.length - 1)
                return true;
        }
    }
    for(let i = 1; i < arr.length; i++){//проверка главной диагонали
        if(arr[i][i] === false || arr[i - 1][i - 1] === false)
            break;
        if(i == arr.length - 1)
            return true;
    }
    //проверка побочной диагонали
    for(let i = 1, j = arr.length - 1 - i; i < arr.length; i++, j--){
        if(arr[i][j] === false || arr[i - 1][j + 1] === false)
            break;
        if(i == arr.length - 1)
                return true;
    }
    return false;
}

function shuffle(array) { 
	let arr =[];
	for(let i = 0; i < array.length; i++) {
		arr[i] = array[i]
	}
 arr.sort(() => Math.random() - 0.5);
 	return arr;
	}

	function clearGrid () {
		for(let i = 0; i < cells3x3.length; i++) {
					for(let j = 0; j < cells3x3[i].length; j++) {
					cells3x3[i][j].classList.remove('stepo');
					cells3x3[i][j].classList.remove('stepx');
				}
			}
			cellsGame = shuffle(cells);
	}

	function checkwin() {
			let arrayX = arrX(cells3x3);
			let arrayO = arrO(cells3x3);

			if(checkArr(arrayX) && checkArr(arrayO)) {
				alert('draw');
				clearGrid(); 			
				return;

			}

			if(checkArr(arrayX)) {
				alert('X--WIN');
						clearGrid(); 		
						return;	
			}

			if(checkArr(arrayO)) {
				alert('O--WIN');
						clearGrid(); 	
						return
			}

			if (cellsGame.length == 0) {
				alert('draw');
				clearGrid(); 	
				return;
			}


		}

			let arrX = (arr) => {
			let masiv = [];
			for(let i = 0; i < arr.length; i++) {
				masiv[i] = [];
				for(let j = 0; j < arr[i].length; j++) {
					masiv[i][j] = cells3x3[i][j].classList.contains('stepx')
				}
			}	
				return masiv;
		};
			let arrO = (arr) => {
			let masiv = [];
			for(let i = 0; i < arr.length; i++) {
				masiv[i] = [];
				for(let j = 0; j < arr[i].length; j++) {
					masiv[i][j] = cells3x3[i][j].classList.contains('stepo')
				}
			}	
				return masiv;
		}


let chunkArray = (arr, cnt) => arr.reduce((prev, cur, i, a) => !(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev, []);

createDiv(document.body);
createTable(document.body.lastChild, 3, 3);
let table = document.body.lastChild.lastChild;											// acces to table
let cells = Array.prototype.slice.call(table.querySelectorAll('td'));			//array
let cells3x3 = chunkArray(cells, 3);
let cellsGame = shuffle(cells);
document.body.classList.add('body');
document.body.lastChild.classList.add('divWithTable');




console.log(document.body.lastChild);
 



table.onclick = function(event) {
  let target = event.target; // где был клик?

  if (target.tagName != 'TD') return; // не на TD? тогда не интересует
  if(target.classList.contains('stepx') || target.classList.contains('stepo')) return;

  target.classList.add('stepx');
  let index = cellsGame.indexOf(target);
  cellsGame.splice(index, 1);
  if(cellsGame.length > 0) {
  cellsGame[0].classList.add('stepo');
  cellsGame.splice(0, 1);
		}

  setTimeout(checkwin, 100);
  
}






