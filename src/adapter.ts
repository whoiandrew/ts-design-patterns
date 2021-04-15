// two different incompatible interfaces
interface IDefaultUser {
  name: string;
  secondName: string;
}

interface ISpecificUser {
  fullName: string;
}

class TargetUser {
  constructor(protected name: string, protected secondName: string) {
    this.name = name;
    this.secondName = secondName;
  }
  getDefaultUser(): IDefaultUser {
    return { name: this.name, secondName: this.secondName } as IDefaultUser;
  }
}

class AdapteeUser {
  constructor(private fullName: string) {
    this.fullName = fullName;
  }

  getSpecificUser() {
    return { fullName: this.fullName } as ISpecificUser;
  }
}

class UserAdapter extends TargetUser {
  constructor(
    protected name: string,
    protected secondName: string,
    private adapteeUser: AdapteeUser
  ) {
    super(name, secondName);
    this.adapteeUser = adapteeUser;
  }

  //adapter logic returns the same type as TargetUser;
  getDefaultUser(): IDefaultUser {
    const [
      name,
      secondName,
    ]: string[] = this.adapteeUser.getSpecificUser().fullName.split(" ");
    return { name, secondName } as IDefaultUser;
  }
}

const someInteractionsWithDefaultUser = (user: TargetUser) => {
  const { name, secondName }: IDefaultUser = user.getDefaultUser();
  console.log(`Hello, I am ${name} ${secondName}`);
};

const defaultUser: TargetUser = new TargetUser("Andrii", "Doroshenko");
const specificUser: AdapteeUser = new AdapteeUser("Andrii Doroshenko");

const adapter: UserAdapter = new UserAdapter("", "", specificUser);

//now, using adapter, it's possible to intercat with specificUser
someInteractionsWithDefaultUser(adapter);
