
(function mainEngine(){
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let grammas = ['ST', 'ND', 'RD', 'TH']
    //Setting the text that's to be used later in the clock

    let initialState = getNewState() //Getting the time once the user enters the site
    initialState.initial = true 

    function getNewState(){ //Constructor function for time. Using an object to collect all the variables at once. 
        return {
            hours: new Date().getHours(), 
            minutes: new Date().getMinutes(), 
            days: new Date().getDate(), 
            years: new Date().getFullYear(),
            dayText: new Date().getDay(),
        }
    }
    
    setInterval(()=>{
        let newState = getNewState()
        let bigHour = document.getElementById('bigHour')
        let bigMinutes = document.getElementById('bigMinutes')
        let bigYear = document.getElementById('bigYear')
        let bigDay = document.getElementById('bigDay')
        let dayText = document.getElementById('dayText')
        //COMPARING THE VARIABLE OBJECCTS, TURNED INTO JSON FOR QUICK COMPARISON INSTEAD OF USING A WHOLE BUNCH OF FUNCTIONS TO COMPARE EVERY KEY
        if(JSON.stringify(newState) != JSON.stringify(initialState)) render()
        //THE FUNCTION RESPONSIBLE FOR TRAVERSING THE DOM 
        function render(){
                if(newState.days != parseInt(bigDay.textContent)){
                    bigDay.textContent = newState.days
                    
                    let gramma = document.createElement('span') //CREATE THE '2ND, 3RD, 4TH, 1ST' LETTERS TO OVERRIDE THE DEFAULT BEHAVIOR 
                    let innerDay = newState.days
                    gramma.setAttribute('id', 'gramma')
                    
                    if(innerDay >= 10 && innerDay <20) innerDay -= 10 //THIS WILL MAKE SURE THAT THE SELECTED TEXT IS THE CORRECT ONE IN RANGE OF THE LENGTH OF THE ARRAY
                    else if(innerDay >= 20) innerDay -=20
                    
                    gramma.textContent = grammas[innerDay>0? innerDay-1:innerDay]
                    bigDay.appendChild(gramma)  //COULD'VE USED SEPARATE ELEMENTS IN HTML TO AVOID THIS, NO NEED THOUGH AS I HAVE IMPLEMENTED PROTECTION FROM OVER-UPDATING THE DOM EVERY INTERVAL
                    
                    dayText.textContent = weekDays[newState.dayText]
                }
                if(newState.minutes != parseInt(bigMinutes.textContent)){
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
        initialState = {...newState} //SETTING THE STATE TO THE UPDATED VALUE, OTHERWISE IT'LL KEEP UPDATING FOR NOTHING
    }, 16)
})()
