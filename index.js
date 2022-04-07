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

function comma(arg) {
   let won = '';
   let arr = [];
   let minus = false;
   (arg < 0) && (minus = true, arg *= -1, won += '-');

   for (var i = 0; i < (Math.floor(arg) + "").length; i++) {
      if (i !== 0 && i % 3 === ((Math.floor(arg) + "").length % 3)) {
         arr.push(',');
         arr.push((Math.floor(arg) + "")[i]);
      } else {
         arr.push((Math.floor(arg) + "")[i]);
      }
   }
   arr.forEach(e => {
      won += e;
   });
   return won;
}

let random_generate = false;
document.querySelector('.random_generate').addEventListener('click', (e) => {
   if (!random_generate){
      random_generate = true;
   } else {
      return;
   }
   const fixed = [];
   fixedNumList.forEach(e => {
      if (e !== "" && !isNaN(e)) {
         fixed.push(e)
      }
   });

   const except = [];
   exceptNumList.forEach(e => {
      if (e !== "" && !isNaN(e)) {
         except.push(e)
      }
   });

   const last = [];
   lastNumList.forEach(e => {
      if (e !== "" && !isNaN(e)) {
         last.push(e)
      }
   });

   let prediction = []
   predictionNumList.forEach(e => {
      if (e !== "" && !isNaN(e)) {
         prediction.push(e)
      }
   });
   let predictions = [];
   predictionsNumList.forEach((e,idx) => {
      predictions.push([]);
      e.forEach(el=>{
         if (el !== "" && !isNaN(el)) {
            predictions[idx].push(el)
         }
      });
   });

   const rottoNum = [];
   fixed.forEach(e => {
      rottoNum.push(e);
      prediction = prediction.filter(ele => ele !== e)
   })
   except.forEach(e => {
      prediction = prediction.filter(ele => ele !== e)
   })
   let a = possibleNum(
      JSON.parse(JSON.stringify(fixed)),
      JSON.parse(JSON.stringify(except)),
      JSON.parse(JSON.stringify(last)),
      JSON.parse(JSON.stringify(prediction)),
      JSON.parse(JSON.stringify(predictions))
   );

   while (rottoNum.length < 6) {
      let random = Math.floor(Math.random() * 45) + 1;
      let status = false;
      rottoNum.forEach(el => {
         if (el === random) {
            status = true;
         }
      });
      let exceptStatus = false;
      if (!status) {
         except.forEach(e => {
            if (e === random) {
               exceptStatus = true;
            }
         })
         if (!exceptStatus) {
            if (last.length === 0) {
               if (prediction.length === 0) {
                  rottoNum.push(random);
               } else {
                  prediction.forEach(e=>{
                     if (e === random) {
                        rottoNum.push(random);
                        prediction=[];
                     }
                  });
               }
            } else {
               last.forEach((e, idx) => {
                  if (e === +(random + '')[(random + '').length - 1]) {
                     rottoNum.push(random);
                     last.splice(idx, 1);
                  }
               });
            }
         }
      }
   }
   for (let i = 0; i < 1000; i++) {
      let x = Math.floor(Math.random() * 6);
      let y = Math.floor(Math.random() * 6);
      [rottoNum[x], rottoNum[y]] = [rottoNum[y], rottoNum[x]];
   }
   for (let i = 0; i < 6; i++) {
      for (let j = i + 1; j < 6; j++) {
         if (rottoNum[i] > rottoNum[j]) {
            [rottoNum[i], rottoNum[j]] = [rottoNum[j], rottoNum[i]];
         }
      }
   }
   // document.querySelectorAll('.random .circle').forEach((el, idx) => {
   //    removeClass(el, 'first');
   //    removeClass(el, 'second');
   //    removeClass(el, 'third');
   //    removeClass(el, 'fourth');
   //    removeClass(el, 'fifth');
   //    if (rottoNum[idx] <= 10) {
   //       addClass(el, 'first')
   //    } else if (rottoNum[idx] <= 20) {
   //       addClass(el, 'second')
   //    } else if (rottoNum[idx] <= 30) {
   //       addClass(el, 'third')
   //    } else if (rottoNum[idx] <= 40) {
   //       addClass(el, 'fourth')
   //    } else if (rottoNum[idx] <= 45) {
   //       addClass(el, 'fifth')
   //    }
   //    el.textContent = rottoNum[idx];
   // });
});

window.onload = ()=>{
   if (document.location.href.includes('0100.ga') || document.location.href.includes('158.247.224.160') || document.location.href.includes('hellonoa.github.io/lotto/')) {
   } else {
      document.querySelector('html').innerHTML = '';
   }
}

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

const predictionNumList = [];
document.querySelectorAll('.field.predictionNum input.circle').forEach((e, idx) => {
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
         predictionNumList[idx] = '';
         el.target.value = '';
      } else {
         predictionNumList[idx] = +el.target.value;
      }
   })
});
const predictionsNumList = [];
document.querySelectorAll('.field.predictionNums').forEach((ele,id)=>{
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

let result = [];
function possibleNum(fix, except, last, prediction, predictions) {
   let chance = 6;
   let feed = [];
   result=[];
   for (let i = 0; i < 45; i++) {
      feed.push(i + 1);
   }
   feed.forEach((e, idx) => {
      fix.forEach(el => {
         if (e === el) {
            feed[idx] = 0;
            chance--;
            e = '';
         }
         prediction = prediction.filter(ele => ele !== el);
         predictions.forEach((pre,idx)=>{
            predictions[idx] = pre.filter(ele => ele !== el);
         })
      });
      except.forEach(el => {
         if (e === el) {
            feed[idx] = 0;
            e = '';
         }
         prediction = prediction.filter(ele => ele !== el)
         predictions.forEach((pre,idx)=>{
            predictions[idx]=pre.filter(ele => ele !== el);
         })
      });
      // last.forEach((el, lastIdx) => {
      //    if (+(e + '')[(e + '').length - 1] === el) {
      //       feed[idx] = 0;
      //       last[lastIdx] = 0;
      //       prediction = prediction.filter(ele => ele !== e)
      //       e = '';
      //    }
      // });
   });
   if (prediction.length >= 1) {
      chance --;
   }
   feed = feed.filter((e, i) => e !== 0);

   let a = 1;
   let b = 1;
   for (let i = 0; i < chance; i++) {
      a *= (chance - i);
      b *= (feed.length - i);
   }
   if (prediction.length >= 1) {
      b *= prediction.length;
   }

   (async()=>{
      // console.log(fix)
      // console.log(except)
      // console.log(last)
      // console.log(prediction)
      // console.log(predictions)
      // console.log(feed)
      window.fix = fix;
      const example = feed;
      let resultt = await getCombinations(example, prediction.length >= 1 ? chance+1 : chance);
      // console.log(resultt);
      resultt.forEach(e=>{
         e.push(...fix)
      })
      except.forEach(e=>{
         while( resultt.findIndex(el=>el.includes(e)) !== -1) {
            resultt.splice(resultt.findIndex(el=>el.includes(e)),1);
         }
      })
      let arr=[];
      prediction.forEach(e=>{
         while (true) {
            let idx = resultt.findIndex(el=>el.includes(e))
            if(idx === -1){
               break;
            }
            arr.push(resultt[idx]);
            resultt.splice(idx,1);
         }
      })
      if (prediction.length === 0) {
         arr = resultt;
      }

      let arr1 = []
      last.forEach(e=>{
         while (true) {
            let idx = arr.findIndex(el=> el.findIndex(ele=>(+(ele + '')[(ele + '').length-1] === e) ) !== -1 );
            if(idx === -1){
               break;
            }
            // console.log(arr[idx])
            arr1.push(arr[idx]);
            arr.splice(idx,1);
         }
      })
      if (last.length === 0) {
         arr1 = arr;
      }

      let arrs = JSON.parse(JSON.stringify(arr1));
      let prestatus = false;
      let ARR = [];
      predictions.forEach(e=>{
         if (e.length !== 0) {
            prestatus = true;
            ARR = [];
            e.forEach(ele=>{
               while (true) {
                  let idx = arrs.findIndex(el=>el.includes(ele))
                  if(idx === -1){
                     break;
                  }
                  ARR.push(arrs[idx]);
                  arrs.splice(idx,1);
               }
            })
            arrs = JSON.parse(JSON.stringify(ARR))
         }
      })
      if(!prestatus) {
         console.log("zero")
         arrs = arr1;
      }
      let arrs1 = [];
      if (document.querySelector('input.continuousNum').checked) {
         arrs.forEach(e=>{
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
         arrs1 = arrs;
      }

      // console.log(resultt);
      // console.log(arr1)

      document.querySelector('.box.possibleNum span.possibleNum').textContent = comma(arrs1.length);
      document.querySelector('.box.possibleNum span.possibleNumPrice').textContent = comma(arrs1.length * 1000);
      await getAllLottoNum(arrs1)
   })();
   // return b / a;
   return false;;
}

const getCombinations = function (arr, selectNumber) {
   const results = [];
   if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return
   arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 뒤
      const combinations = getCombinations(rest, selectNumber - 1); // 나머지에 대해서 조합을 구한다.
      const attached = combinations.map((combination) => [fixed, ...combination]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
      results.push(...attached); // 배열 spread syntax 로 모두다 push
   });
   return results; // 결과 담긴 results return
 }

 let lottoList = document.querySelector('.lottoList');
 async function getAllLottoNum(obj, status = false, num = 1) {
   lottoList.innerHTML = '';
   document.querySelector('a.btn.random_generate').innerHTML="출력중....";
   // document.querySelector('.field.search .chasu').textContent = `${obj[0].chasu+1} : `
   obj.forEach((e, idx)=>{
      // console.log(e.chasu-count*num)
         setTimeout(() => {
            let li  = document.createElement('li')
            let chasu = document.createElement('div')
            chasu.classList.add('chasu')
            chasu.appendChild(document.createTextNode(idx+1 + ' : '))
            li.appendChild(chasu)
            e.forEach(el=>{
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
            lottoList.appendChild( li );
            if (idx === obj.length-1) {
               random_generate = false;
               alert('load complete!')
               document.querySelector('a.btn.random_generate').innerHTML="모든 경우의 수 출력";
            }
         }, Math.floor(idx*0.1) );
   })
}
