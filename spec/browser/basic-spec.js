var TestApplication = require('../../src/browser/test-application')

describe("Basic Browser", function(){
  describe("TestApplication", function(){
    var app

    beforeEach(function(){
      app = new TestApplication({browserSpecDirectory: './some-path'})
      spyOn(app, 'callSpecRunner')
      spyOn(app, 'exit')
      app.start()
    })

    it("runs only browserSpecs when browserSpecDirectory is specified", function(){
      args = app.callSpecRunner.calls.mostRecent().args
      expect(args[0].specDirectory).toBe('./some-path')
    })

    it("passes the browser exitCode through to the exit function", function(done){
      args = app.callSpecRunner.calls.mostRecent().args

      app.exit.and.callFake(function(exitCode){
        expect(exitCode).toBe(1)
        done
      })

      args[2](1)
    })
  })
})
