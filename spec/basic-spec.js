describe("Basic", function(){
  it("loads the spec-helper file", function(){
    expect('spec-helper').toHaveACustomMatcher()
  })

  it("runs es6 code", function(){
    class Something {
      constructor() {
        this.hello = 'Hey'
      }
    }
    something = new Something
    expect(something.hello).toBe('Hey')
  })

  it("exposes the correct jasmine global", function(){
    spy = jasmine.createSpy('something')
    expect(spy.calls.count()).toBe(0)
  })

  it("exposes jasmine.attachToDOM", function(){
    div = document.createElement('div')
    div.id = 'a-test'

    expect(document.querySelector('#a-test')).toBe(null)
    jasmine.attachToDOM(div)
    expect(document.querySelector('#a-test')).not.toBe(null)
  })

  describe("clearing state between specs", function(){
    it("clears out the jasmine-content element between specs", function(){
      div = document.createElement('div')
      jasmine.attachToDOM(div)

      nodes = document.querySelector('#jasmine-content').childNodes
      expect(nodes.length).toBe(1)
    })

    it("does not have the element from the previous spec", function(){
      nodes = document.querySelector('#jasmine-content').childNodes
      expect(nodes.length).toBe(0)
    })
  })
})
