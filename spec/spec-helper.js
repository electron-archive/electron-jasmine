
beforeEach(function() {
  jasmine.addMatchers({
    toHaveACustomMatcher: function(){
      return {
        compare: function(){
          return {pass: true}
        }
      }
    }
  })
})
