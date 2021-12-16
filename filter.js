getLottoNumScript();
function getLottoNumScript() {
   const script = document.createElement("script");
   script.src = "https://api.lotto-haru.kr/win/analysis.js?callback=getLottoNum"
   document.getElementsByTagName('head')[0].appendChild(script);
}

function getLottoNum(res) {
   getAllLottoNumScript(res.data[0].chasu);
}

function getAllLottoNumScript(end) {
   if (window.localStorage.getItem('lastestNum') === null || JSON.parse(window.localStorage.getItem('lastestNum')) !== end ){
      window.localStorage.setItem('lastestNum', JSON.stringify(end));
      const script = document.createElement("script");
      script.src =  `https://api.lotto-haru.kr/win/analysis/0/1/${end}.js?callback=getAllLottoNum`
      document.getElementsByTagName('head')[0].appendChild(script);
   } else {
      getAllLottoNum(JSON.parse(window.localStorage.getItem('lotto')), true);
   }
}

async function getAllLottoNum(obj, status = false, num = 1) {
   if (status === false){
      console.log(obj);
      window.localStorage.setItem('lotto', JSON.stringify(obj.data));
      obj = obj.data;
   }
   lottoList.innerHTML = '';
   resultLottoList = [];
   let count = obj[0].chasu+1-num;
   if (document.querySelector('input.testNum').checked) {
      document.querySelector('.field.search .chasu').textContent = `${obj[0].chasu+2} : `
      if (num !== 1) {
         count +=1;
      }
   } else {
      document.querySelector('.field.search .chasu').textContent = `${obj[0].chasu+1} : `
   }
   obj.forEach((e, idx)=>{
      // console.log(e.chasu-count*num)
      if(e.chasu === count) {
         count-=num;
         resultLottoList.push(e)
         setTimeout(() => {
            let li  = document.createElement('li')
            let chasu = document.createElement('div')
            chasu.classList.add('chasu')
            chasu.appendChild(document.createTextNode(e.chasu + ' : '))
            li.appendChild(chasu)
            e.ball.forEach(el=>{
               let circleDiv = document.createElement('div');
               circleDiv.classList.add('circle')
               if (el <= 10){
                  circleDiv.classList.add('first')
               } else if (el <= 20) {
                  circleDiv.classList.add('second')
               } else if (el <= 30)  {
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
               li.appendChild(circleDiv)
            });

            let circleDiv = document.createElement('div');
            circleDiv.classList.add('circle')
            if (e.bonusBall <= 10){
               circleDiv.classList.add('first')
            } else if (e.bonusBall <= 20) {
               circleDiv.classList.add('second')
            } else if (e.bonusBall <= 30)  {
               circleDiv.classList.add('third')
            } else if (e.bonusBall <= 40) {
               circleDiv.classList.add('fourth')
            } else if (e.bonusBall <= 45) {
               circleDiv.classList.add('fifth')
            }  
            let plus = document.createElement('div');
            plus.classList.add('plusCircle');
            let i = document.createElement('i');
            i.classList.add('plus');
            plus.appendChild(i);
            li.appendChild(plus);

            let num = document.createElement('strong');
            num.classList.add('text-light');
            num.appendChild(document.createTextNode(`${e.bonusBall}`));
            circleDiv.appendChild(num)
            li.appendChild(circleDiv)
            lottoList.appendChild( li );
         }, 0);
      }
   })
}

let lottoList = document.querySelector('.lottoList');
let resultLottoList = [];
// let num = 1;
// setInterval(e=>{
//    num ++;
//    getAllLottoNum(JSON.parse(window.localStorage.getItem('lotto')), true, num);
// },3000)

let lottoListCount_btn_status = false;
document.querySelector('.lottoListCount_btn').addEventListener('click',(e)=>{
   if (!lottoListCount_btn_status) {
      lottoListCount_btn_status = true;
      let num = +document.querySelector('.lottoListCount').value;
      getAllLottoNum(JSON.parse(window.localStorage.getItem('lotto')), true, num);
      setTimeout(()=>{
         lottoListCount_btn_status = false;
      },500);
   }
});

document.querySelectorAll('.field.search input.circle').forEach((e, idx)=>{
   e.addEventListener('input',(el)=>{
      if(el.target.value <= 0 || el.target.value > 45) {
         el.target.value = 'a'
      }
      removeClass(el.target, 'first');
      removeClass(el.target, 'second');
      removeClass(el.target, 'third');
      removeClass(el.target, 'fourth');
      removeClass(el.target, 'fifth');
      if (el.target.value <= 10){
         addClass(el.target, 'first')
      } else if (el.target.value <= 20) {
         addClass(el.target, 'second')
      } else if (el.target.value <= 30)  {
         addClass(el.target, 'third')
      } else if (el.target.value <= 40) {
         addClass(el.target, 'fourth')
      } else if (el.target.value <= 45) {
         addClass(el.target, 'fifth')
      }

      if (isNaN(+el.target.value)) {
            lottoListCount[idx] = '';
            el.target.value = '';
      }else {
         lottoListCount[idx] = el.target.value;
      }
   })
});

let lottoListCount = [];
lottoListCount[0] = '';
lottoListCount[1] = '';
lottoListCount[2] = '';
lottoListCount[3] = '';
lottoListCount[4] = '';
lottoListCount[5] = '';
lottoListCount[6] = '';

document.querySelector('.FilterLottoCorrectNumber_btn').addEventListener('click',(e)=>{
   const nextCase = document.querySelector('input.include_next_case').checked;
   console.log(nextCase)
   const filter = [];
   let result = [];
   lottoListCount.forEach(e=>{
      if (!isNaN(e)){
         filter.push(+e)
      }
   })
   // console.log(JSON.parse(JSON.stringify(resultLottoList)));
   let Weekfilter = JSON.parse(JSON.stringify(resultLottoList));
   Weekfilter.forEach((e, idx)=>{
      e.ball.forEach(el=>{
         filter.forEach(list=>{
            if ([el].includes(list)) {
               if (result.findIndex(ft=>ft.chasu===e.chasu) === -1){
                  result.push(e);
               }
            }
         });
      })
      filter.forEach(list=>{
         if ([e.bonusBall].includes(list)) {
            if (result.findIndex(ft=>ft.chasu===e.chasu) === -1){
               result.push(e);
            }
         }
      });
   })
   resultLottoList = JSON.parse(JSON.stringify(result));
   showLottoResult(result)
})

document.querySelector('.StrongFilterLottoCorrectNumber_btn').addEventListener('click',(e)=>{
   const nextCase = document.querySelector('input.include_next_case').checked;
   const filter = [];
   let result = [];
   lottoListCount.forEach(e=>{
      if (!isNaN(e) && +e!== 0 ){
         filter.push(+e)
      }
   })
   let Strongfilter = JSON.parse(JSON.stringify(resultLottoList));
   filter.forEach(ft => {
      result = [];
      Strongfilter.forEach((e, idx)=>{
         e.ball.forEach(el=>{
            if ([el].includes(ft)) {
               result.push(e);
               Strongfilter = result;
            }
         })
         if ([e.bonusBall].includes(ft)) {
            result.push(e);
            Strongfilter = result;
         }
      })
   })
   resultLottoList = JSON.parse(JSON.stringify(result));
   showLottoResult(result)
});

document.querySelector('.StrongerFilterLottoCorrectNumber_btn').addEventListener('click',(e)=>{
   const nextCase = document.querySelector('input.include_next_case').checked;
   const filter = [];
   let result = [];
   lottoListCount.forEach(e=>{
      if (!isNaN(e)){
         filter.push(+e)
      }
   })
   console.log(filter)
   let Strongerfilter = JSON.parse(JSON.stringify(resultLottoList));
   filter.forEach((ft, idx) => {
      if(ft !== 0){
         result = [];
         Strongerfilter.forEach((e)=>{
            if(idx !== 6){
               if (e.ball[idx] === ft) {
                  result.push(e);
                  Strongerfilter = result;
               }
            }else {
               if (e.bonusBall === ft) {
                  result.push(e);
                  Strongerfilter = result;
               }
            }
         })
      }
   })
   resultLottoList = JSON.parse(JSON.stringify(result));
   showLottoResult(result)
});

window.onload = ()=>{
   if (document.location.href.includes('0100.ga') || document.location.href.includes('158.247.224.160')) {
   } else {
      document.querySelector('html').innerHTML = '';
   }
}

function showLottoResult(result) {
   lottoList.innerHTML = '';
   
   result.forEach(e=>{
      setTimeout(() => {
         let li  = document.createElement('li')
         let chasu = document.createElement('div')
         chasu.classList.add('chasu')
         chasu.appendChild(document.createTextNode(e.chasu + ' : '))
         li.appendChild(chasu)
         e.ball.forEach(el=>{
            let circleDiv = document.createElement('div');
            circleDiv.classList.add('circle')
            if (el <= 10){
               circleDiv.classList.add('first')
            } else if (el <= 20) {
               circleDiv.classList.add('second')
            } else if (el <= 30)  {
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
            li.appendChild(circleDiv)
         });

         let circleDiv = document.createElement('div');
         circleDiv.classList.add('circle')
         if (e.bonusBall <= 10){
            circleDiv.classList.add('first')
         } else if (e.bonusBall <= 20) {
            circleDiv.classList.add('second')
         } else if (e.bonusBall <= 30)  {
            circleDiv.classList.add('third')
         } else if (e.bonusBall <= 40) {
            circleDiv.classList.add('fourth')
         } else if (e.bonusBall <= 45) {
            circleDiv.classList.add('fifth')
         }  
         let plus = document.createElement('div');
         plus.classList.add('plusCircle');
         let i = document.createElement('i');
         i.classList.add('plus');
         plus.appendChild(i);
         li.appendChild(plus);

         let num = document.createElement('strong');
         num.classList.add('text-light');
         num.appendChild(document.createTextNode(`${e.bonusBall}`));
         circleDiv.appendChild(num)
         li.appendChild(circleDiv)
         lottoList.appendChild( li );
      }, 0);
   });
   showNextCase();
}

function showNextCase(){

   const nextCase = document.querySelector('input.include_next_case').checked;
   const SecondList = document.querySelector('.secondList')
   SecondList.innerHTML = '';
   if (!nextCase) {
      SecondList.style.display = 'none';
      return;
   }
   SecondList.style.display = 'inline-block';

   const nextCaseFilter = JSON.parse(window.localStorage.getItem('lotto'));

   
   resultLottoList.forEach(e=>{
      e = nextCaseFilter[nextCaseFilter.findIndex(ft=>ft.chasu===e.chasu+1)]
      setTimeout(() => {
         let li  = document.createElement('li')
         let chasu = document.createElement('div')
         chasu.classList.add('chasu')
         chasu.appendChild(document.createTextNode(e.chasu + ' : '))
         li.appendChild(chasu)
         e.ball.forEach(el=>{
            let circleDiv = document.createElement('div');
            circleDiv.classList.add('circle')
            if (el <= 10){
               circleDiv.classList.add('first')
            } else if (el <= 20) {
               circleDiv.classList.add('second')
            } else if (el <= 30)  {
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
            li.appendChild(circleDiv)
         });

         let circleDiv = document.createElement('div');
         circleDiv.classList.add('circle')
         if (e.bonusBall <= 10){
            circleDiv.classList.add('first')
         } else if (e.bonusBall <= 20) {
            circleDiv.classList.add('second')
         } else if (e.bonusBall <= 30)  {
            circleDiv.classList.add('third')
         } else if (e.bonusBall <= 40) {
            circleDiv.classList.add('fourth')
         } else if (e.bonusBall <= 45) {
            circleDiv.classList.add('fifth')
         }  
         let plus = document.createElement('div');
         plus.classList.add('plusCircle');
         let i = document.createElement('i');
         i.classList.add('plus');
         plus.appendChild(i);
         li.appendChild(plus);

         let num = document.createElement('strong');
         num.classList.add('text-light');
         num.appendChild(document.createTextNode(`${e.bonusBall}`));
         circleDiv.appendChild(num)
         li.appendChild(circleDiv)
         SecondList.appendChild( li );
      }, 0);
   });
}

function addClass(el, className){
	if (el.classList) {
		el.classList.add(className);
	} else {
		var current = el.className, found = false;
		var all = current.split(' ');
		for(var i=0; i<all.length, !found; i++) found = all[i] === className;
		if(!found) {
		if(current === '') el.className = className;
		else el.className += ' ' + className;
		}
	}
}

function removeClass(el, className){
	if (el.classList)
		el.classList.remove(className);
	else
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function hasClass(el, className){
	if (el.classList)
		return el.classList.contains(className);
	else
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function comma(arg){
   let won = '';
   let arr = [];
   let minus = false;
   (arg<0) && (minus = true, arg*=-1, won += '-');

   for(var i=0; i<(Math.floor(arg)+"").length; i++) {
       if( i !== 0 && i%3 === ((Math.floor(arg)+"").length % 3) ){
           arr.push(',');
           arr.push((Math.floor(arg)+"")[i]);
       } else {
           arr.push((Math.floor(arg)+"")[i]);
       }
   }
   arr.forEach(e=>{
       won += e;
   });
   return won;
}

const fixedNumList = [];
document.querySelectorAll('.field.fixedNum input.circle').forEach((e, idx)=>{
   e.addEventListener('input',(el)=>{
      if(el.target.value <= 0 || el.target.value > 45) {
         el.target.value = 'a'
      }
      removeClass(el.target, 'first');
      removeClass(el.target, 'second');
      removeClass(el.target, 'third');
      removeClass(el.target, 'fourth');
      removeClass(el.target, 'fifth');
      if (el.target.value <= 10){
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
      }else {
         fixedNumList[idx] = +el.target.value;
      }
   })
});

const exceptNumList = [];
document.querySelectorAll('.field.exceptNum input.circle').forEach((e, idx)=>{
   e.addEventListener('input',(el)=>{
      if(el.target.value <= 0 || el.target.value > 45) {
         el.target.value = 'a'
      }
      removeClass(el.target, 'first');
      removeClass(el.target, 'second');
      removeClass(el.target, 'third');
      removeClass(el.target, 'fourth');
      removeClass(el.target, 'fifth');
      if (el.target.value <= 10){
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
      }else {
         exceptNumList[idx] = +el.target.value;
      }
   })
});

const lastNumList = [];
document.querySelectorAll('.field.lastNum input.circle').forEach((e, idx)=>{
   e.addEventListener('input',(el)=>{
      if(el.target.value < 0 || el.target.value > 9) {
         el.target.value = 'a'
      }
      removeClass(el.target, 'first');
      removeClass(el.target, 'second');
      removeClass(el.target, 'third');
      removeClass(el.target, 'fourth');
      removeClass(el.target, 'fifth');
      if(el.target.value === ''){
         el.target.value = 'a'
      }if (el.target.value <= 10){
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
      }else {
         lastNumList[idx] = +el.target.value;
      }
   })
});

function possibleNum(fix, except, last) {
   let chance = 6;
   let feed = [];
   for (let i=0; i<45; i++) {
      feed.push(i+1);
   }
   feed.forEach((e, idx)=>{
      fix.forEach(el=>{
         if (e===el){
            feed[idx] = 0;
            chance--;
            e='';
         }
      });
      except.forEach(el=>{
         if (e===el){
            feed[idx] = 0;
            e='';
         }
      });
      last.forEach((el,lastIdx)=>{
         if ( +(e+'')[(e+'').length-1] === el){
            feed[idx] = 0;
            last[lastIdx] = 0;
            e='';
         }
      });
   });

   feed = feed.filter((e, i) => e !== 0);

   let a=1;
   let b=1;
   for(let i=0; i<chance; i++){
      a *= (chance-i);
      b *= (feed.length-i);
   }
   return b/a;
}

document.querySelector('input.testNum').addEventListener('click',e=>{
   if (document.querySelector('input.testNum').checked) {
      document.querySelector('ul.testNum').style.display = 'block';
   } else {
      document.querySelector('ul.testNum').style.display = 'none'
   }
})
document.querySelectorAll('ul.testNum input.circle').forEach((e, idx)=>{
   e.addEventListener('input',(el)=>{
      if(el.target.value <= 0 || el.target.value > 45) {
         el.target.value = 'a'
      }
      removeClass(el.target, 'first');
      removeClass(el.target, 'second');
      removeClass(el.target, 'third');
      removeClass(el.target, 'fourth');
      removeClass(el.target, 'fifth');
      if(el.target.value === ''){
         el.target.value = 'a'
      }if (el.target.value <= 10){
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
         el.target.value = '';
      }
   })
});
