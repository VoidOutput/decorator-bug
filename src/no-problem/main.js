function Decorator ({ property } = {}) {
  return function ClassDecorator (classDescriptor) {
    console.log(property)
    return classDescriptor
  }
}

@Decorator({
  property: true
})
class GenericClassOne {
  method () {
    Promise.resolve()

    return true
  }
}

class GenericClassTwo {
  async method () {
    await Promise.resolve()

    return true
  }
}
