// eslint-disable-next-line no-undef
d3.select('div')
.selectAll('p') // creates a "selection"
.data([ 1, 2, 3 ]) // binds p elements to data
.enter() // retrieves elements that have been bound but not yet created
.append('p') // creates a new elements from retrieved
.text( dta => dta );
