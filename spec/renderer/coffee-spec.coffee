describe "CoffeeScript Specs", ->
  it "runs CoffeeScript specs", ->
    spy = jasmine.createSpy('a-spy')
    expect(spy.calls.count()).toBe 0
