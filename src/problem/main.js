function Decorator ({ property } = {}) {
  return function ClassDecorator (classDescriptor) {
    console.log(property)
    return classDescriptor
  }
}

@Decorator({
  property: true
})
class GenericClass {
  async method () {
    await Promise.resolve()

    return true
  }
}
