interface IHandler {
  setNext(handler: IHandler): IHandler;
  handle(request: string): string;
}

abstract class AbstractHandler implements IHandler {
  private nextHandler: IHandler;

  //setting next handler for current one
  setNext(handler: IHandler): IHandler {
    this.nextHandler = handler;
    return handler;
  }

  //call from child class for redirection to next handler
  handle(request: string): string {
    return this.nextHandler ? this.nextHandler.handle(request) : "";
  }
}

class UserHandler extends AbstractHandler {
  handle(request: string): string {
    const role: string = request.split(" ")[0];
    return request === "user permission"
      ? `${role} permissions has applied for request: \"${request}\"`
      : super.handle(request);
  }
}

class ModerHandler extends AbstractHandler {
  handle(request: string): string {
    const role: string = request.split(" ")[0];
    return request === "moder permission"
      ? `${role} permissions has applied for request: \"${request}\"`
      : super.handle(request);
  }
}

class AdminHandler extends AbstractHandler {
  handle(request: string): string {
    const role: string = request.split(" ")[0];
    return request === "admin permission"
      ? `${role} permissions has applied for request: \"${request}\"`
      : super.handle(request);
  }
}

const userHandler = new UserHandler();
const moderHandler = new ModerHandler();
const adminHandler = new AdminHandler();

//chain of resposibilies according to user permissons

userHandler.setNext(moderHandler).setNext(adminHandler);

const code = (handler: IHandler) => {
  const incomingPermissons = [
    "user permission",
    "admin permission",
    "another permission",
  ];

  incomingPermissons.forEach((permissonMessage) => {
    const result: string = handler.handle(permissonMessage);
    if (result) {
      console.log(result);
    } else {
      console.log(permissonMessage + ": no such permission settings");
    }
  });
};

code(userHandler);
