
(function mainEngine(){
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let grammas = ['ST', 'ND', 'RD', 'TH']
    

    let initialState = getNewState()
    function getNewState(){
        return {
            hours: new Date().getHours(), 
            minutes: new Date().getMinutes(), 
            days: new Date().getDate(), 
            years: new Date().getFullYear(),
            dayText: new Date().getDay(),
            seconds: new Date().getSeconds()
        }
    }
    
    setInterval(()=>{
        let newState = getNewState()
        let bigHour = document.getElementById('bigHour')
        let bigMinutes = document.getElementById('bigMinutes')
        let bigYear = document.getElementById('bigYear')
        let bigDay = document.getElementById('bigDay')
        let dayText = document.getElementById('dayText')
        if(JSON.stringify(newState) != JSON.stringify(initialState)) render()
        function render(){
                if(newState.days != parseInt(bigDay.textContent)){
                    bigDay.textContent = newState.days
                    
                    let gramma = document.createElement('span') //CREATE THE '2ND, 3RD, 4TH, 1ST' LETTERS TO OVERRIDE THE DEFAULT BEHAVIOR 
                    let innerDay = newState.days
                    gramma.setAttribute('id', 'gramma')
                    
                    if(innerDay >= 10 && innerDay <20) innerDay -= 10
                    else if(innerDay >= 20) innerDay -=20
                    
                    gramma.textContent = grammas[innerDay>0? innerDay-1:innerDay]
                    bigDay.appendChild(gramma)
                    
                    dayText.textContent = weekDays[newState.dayText]
                }
                if(newState.minutes != bigMinutes.textContent){
                    if(newState.minutes <10) bigMinutes.textContent = `:0${newState.minutes}`
                    else bigMinutes.textContent = `:${newState.minutes}`
                }
                if(newState.years != parseInt(bigYear.textContent)){
                    bigYear.textContent = newState.years
                }
                
                if(newState.hours != parseInt(bigHour.textContent)){
                    let innerSpan = document.createElement('span')
                    innerSpan.setAttribute('id', 'bigMinutes')
                    innerSpan.setAttribute('title', 'Minutes')
                    if(newState.minutes <10) innerSpan.textContent = `:0${newState.minutes}`
                    else innerSpan.textContent = `:${newState.minutes}`

                    bigHour.textContent = newState.hours
                    bigHour.appendChild(innerSpan)
                }
            }
        initialState = {...newState}
    }, 16)
})()
