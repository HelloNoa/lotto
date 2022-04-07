
function addClass(el, className) {
	if (el.classList) {
		el.classList.add(className);
	} else {
		var current = el.className, found = false;
		var all = current.split(' ');
		for (var i = 0; i < all.length, !found; i++) found = all[i] === className;
		if (!found) {
			if (current === '') el.className = className;
			else el.className += ' ' + className;
		}
	}
}

function removeClass(el, className) {
	if (el.classList)
		el.classList.remove(className);
	else
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function hasClass(el, className) {
	if (el.classList)
		return el.classList.contains(className);
	else
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}


const filtersNum = document.querySelector('.field.filtersNum');
for (let i = 0; i < 30; i++) {
	let div = document.createElement('div');
	div.classList.add('field');
	div.classList.add('font_zero');
	div.classList.add('filterNum');

	let circleText = document.createElement('div');
	circleText.classList.add('circleText');
	circleText.appendChild(document.createTextNode(`조건 ${i + 1}`));

	for (let j = 0; j < 6; j++) {
		let circle = document.createElement('input');
		circle.classList.add('circle');
		div.appendChild(circle);
	}
	div.appendChild(circleText);
	div.appendChild(document.createElement('br'));
	for (let j = 0; j < 6; j++) {
		let circle = document.createElement('input');
		circle.classList.add('circle');
		div.appendChild(circle);
	}
	filtersNum.appendChild(div)
}

const predictionsNumList = [];
filtersNum.querySelectorAll('.field.filterNum').forEach((ele, id) => {
	predictionsNumList.push([]);
	ele.querySelectorAll('input.circle').forEach((e, idx) => {
		e.addEventListener('input', (el) => {
			if (el.target.value <= 0 || el.target.value > 45) {
				el.target.value = 'a'
			}
			removeClass(el.target, 'first');
			removeClass(el.target, 'second');
			removeClass(el.target, 'third');
			removeClass(el.target, 'fourth');
			removeClass(el.target, 'fifth');
			if (el.target.value === '') {
				el.target.value = 'a'
			} if (el.target.value <= 10) {
				addClass(el.target, 'first')
			} else if (el.target.value <= 20) {
				addClass(el.target, 'second')
			} else if (el.target.value <= 30) {
				addClass(el.target, 'third')
			} else if (el.target.value <= 40) {
				addClass(el.target, 'fourth')
			} else if (el.target.value <= 45) {
				addClass(el.target, 'fifth')
			}

			if (isNaN(+el.target.value)) {
				predictionsNumList[id][idx] = '';
				el.target.value = '';
			} else {
				predictionsNumList[id][idx] = +el.target.value;
			}
		})
	});
});

const fixedNumList = [];
document.querySelectorAll('.field.fixedNum input.circle').forEach((e, idx) => {
	e.addEventListener('input', (el) => {
		if (el.target.value <= 0 || el.target.value > 45) {
			el.target.value = 'a'
		}
		removeClass(el.target, 'first');
		removeClass(el.target, 'second');
		removeClass(el.target, 'third');
		removeClass(el.target, 'fourth');
		removeClass(el.target, 'fifth');
		if (el.target.value <= 10) {
			addClass(el.target, 'first')
		} else if (el.target.value <= 20) {
			addClass(el.target, 'second')
		} else if (el.target.value <= 30) {
			addClass(el.target, 'third')
		} else if (el.target.value <= 40) {
			addClass(el.target, 'fourth')
		} else if (el.target.value <= 45) {
			addClass(el.target, 'fifth')
		}

		if (isNaN(+el.target.value)) {
			fixedNumList[idx] = '';
			el.target.value = '';
		} else {
			fixedNumList[idx] = +el.target.value;
		}
	})
});

const exceptNumList = [];
document.querySelectorAll('.field.exceptNum input.circle').forEach((e, idx) => {
	e.addEventListener('input', (el) => {
		if (el.target.value <= 0 || el.target.value > 45) {
			el.target.value = 'a'
		}
		removeClass(el.target, 'first');
		removeClass(el.target, 'second');
		removeClass(el.target, 'third');
		removeClass(el.target, 'fourth');
		removeClass(el.target, 'fifth');
		if (el.target.value <= 10) {
			addClass(el.target, 'first')
		} else if (el.target.value <= 20) {
			addClass(el.target, 'second')
		} else if (el.target.value <= 30) {
			addClass(el.target, 'third')
		} else if (el.target.value <= 40) {
			addClass(el.target, 'fourth')
		} else if (el.target.value <= 45) {
			addClass(el.target, 'fifth')
		}

		if (isNaN(+el.target.value)) {
			exceptNumList[idx] = '';
			el.target.value = '';
		} else {
			exceptNumList[idx] = +el.target.value;
		}
	})
});

const lastNumList = [];
document.querySelectorAll('.field.lastNum input.circle').forEach((e, idx) => {
	e.addEventListener('input', (el) => {
		if (el.target.value < 0 || el.target.value > 9) {
			el.target.value = 'a'
		}
		removeClass(el.target, 'first');
		removeClass(el.target, 'second');
		removeClass(el.target, 'third');
		removeClass(el.target, 'fourth');
		removeClass(el.target, 'fifth');
		if (el.target.value === '') {
			el.target.value = 'a'
		} if (el.target.value <= 10) {
			addClass(el.target, 'first')
		} else if (el.target.value <= 20) {
			addClass(el.target, 'second')
		} else if (el.target.value <= 30) {
			addClass(el.target, 'third')
		} else if (el.target.value <= 40) {
			addClass(el.target, 'fourth')
		} else if (el.target.value <= 45) {
			addClass(el.target, 'fifth')
		}

		if (isNaN(+el.target.value)) {
			lastNumList[idx] = '';
			el.target.value = '';
		} else {
			lastNumList[idx] = +el.target.value;
		}
	})
});

document.querySelector('.btn.filter_generate').addEventListener('click', e => {
	const fixed = [];
	fixedNumList.forEach(e => {
		if (e !== "" && !isNaN(e)) {
			fixed.push(e)
		}
	});

	let except = [];
	exceptNumList.forEach(e => {
		if (e !== "" && !isNaN(e)) {
			except.push(e)
		}
	});

	let predictions = [];
	predictionsNumList.forEach((e, idx) => {
		predictions.push([]);
		e.forEach(el => {
			if (el !== "" && !isNaN(el)) {
				predictions[idx].push(el)
			}
		});
	});

	const last = [];
	lastNumList.forEach(e => {
		if (e !== "" && !isNaN(e)) {
			last.push(e)
		}
	});

	// console.log(fixed)
	// console.log(except)
	// console.log(predictions)
	// console.log(last)

	let result = [];
	for (let i = 0; i < 45; i++) {
		result.push(i + 1);
	}

	fixed.forEach(e => {
		except = except.filter(el => el !== e);
	});
	except.forEach(e => {
		result = result.filter(el => el !== e);
	});

	let arr = [];
	predictions.forEach(e => {
		e.forEach(el => {
			if (result.findIndex(ele => ele === el) !== -1) {
				// result = result.filter(ele=>ele!==el)
				arr.push(el);
			}
		});
		if (e.length !== 0) {
			result = JSON.parse(JSON.stringify(arr));
			arr = [];
		}
	});
	last.forEach(e => {
		result = result.filter(el => +(el + '')[(el + "").length - 1] === e)
	})

	let arrs1 = [];
	if (document.querySelector('input.continuousNum').checked) {
		result.forEach(e=>{
		  let status = false;
		  for (let i=0; i<e.length-1; i++) {
			 for (let j=0; j<e.length; j++) {
				if (e[i]-1 === e[j] || e[i]-1 === e[j]) {
				   arrs1.push(e);
				}
				if (status) break;
			 }
			 if (status) break;
		  }
	   });
	} else {
	   arrs1 = result;
	}

	console.log(arrs1)
	getAllLottoNum(arrs1)
});
window.onload = ()=>{
	if (document.location.href.includes('0100.ga') || document.location.href.includes('158.247.224.160') || document.location.href.includes('hellonoa.github.io/lotto/')) {
	} else {
	   document.querySelector('html').innerHTML = '';
	}
 }
let lottoList = document.querySelector('.lottoList');
async function getAllLottoNum(obj, status = false, num = 1) {
	lottoList.innerHTML = '';
	// document.querySelector('.field.search .chasu').textContent = `${obj[0].chasu+1} : `
	let li = document.createElement('li')
	obj.forEach((el, idx) => {
		// console.log(e.chasu-count*num)
		setTimeout(() => {
			let circleDiv = document.createElement('div');
			circleDiv.classList.add('circle')
			if (el <= 10) {
				circleDiv.classList.add('first')
			} else if (el <= 20) {
				circleDiv.classList.add('second')
			} else if (el <= 30) {
				circleDiv.classList.add('third')
			} else if (el <= 40) {
				circleDiv.classList.add('fourth')
			} else if (el <= 45) {
				circleDiv.classList.add('fifth')
			}
			let num = document.createElement('strong');
			num.classList.add('text-light');
			num.appendChild(document.createTextNode(`${el}`));
			circleDiv.appendChild(num)
			if (idx % 5 === 0 && idx !== 0) {
				li.appendChild(document.createElement('br'))
			}
			li.appendChild(circleDiv)

			lottoList.appendChild(li);
		}, Math.floor(idx * 0.1));
	})
}
