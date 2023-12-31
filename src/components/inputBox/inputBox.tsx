import {AxiosInstance} from "axios";
import {useEffect, useState} from "react";
import {useAxiosInstanceNoToken} from "../../Axios/api";

export class ErrorClass {
  constructor(e?: Partial<ErrorClass>) {
    this.isIdEmpty = e?.isIdEmpty ?? true;
    this.isNeedchkDuplicate = e?.isNeedchkDuplicate ?? true;
    this.isDuplicate = e?.isDuplicate ?? true;
    this.isPwEmpty = e?.isPwEmpty ?? true;
    this.isPwIncorrect = e?.isPwIncorrect ?? true;
    this.isNameEmpty = e?.isNameEmpty ?? true;
    this.isEmailEmpty = e?.isEmailEmpty ?? true;
    this.isEmailIncorrect = e?.isEmailIncorrect ?? true;
    this.isNeedchkEmailDuplicate = e?.isNeedchkEmailDuplicate ?? true;
    this.isEmailDuplicate = e?.isEmailDuplicate ?? true;
    this.isCalendarEmpty = e?.isCalendarEmpty ?? true;
    this.message = e?.message ?? "";
  }

  public isIdEmpty: boolean;
  public isNeedchkDuplicate: boolean;
  public isDuplicate: boolean;
  public isPwEmpty: boolean;
  public isPwIncorrect: boolean;
  public isNameEmpty: boolean;
  public isEmailEmpty: boolean;
  public isEmailIncorrect: boolean;
  public isNeedchkEmailDuplicate: boolean;
  public isEmailDuplicate: boolean;
  public isCalendarEmpty: boolean;
  public message: string;

  public setIdEmpty(b: boolean) {
    this.isIdEmpty = b;
  }

  public isValid() {
    if (this.isIdEmpty) {
      this.message = "ID를 입력해주세요.";
      return false;
    }
    if (this.isNeedchkDuplicate) {
      this.message = "중복체크를 확인해주세요.";
      return false;
    }
    if (this.isDuplicate) {
      this.message = "ID가 중복됩니다.";
      return false;
    }
    if (this.isPwEmpty) {
      this.message = "비밀번호를 입력해주세요.";
      return false;
    }
    if (this.isPwIncorrect) {
      this.message = "비밀번호가 일치하지 않습니다.";
      return false;
    }
    // if (this.isNameEmpty) {
    //   this.message = "성함을 입력해주세요.";
    //   return false;
    // }
    if (this.isCalendarEmpty) {
      this.message = "생년월일을 입력해주세요.";
      return false;
    }
    if (this.isEmailEmpty) {
      this.message = "이메일을 입력해주세요.";
      return false;
    }
    if (this.isNeedchkEmailDuplicate) {
      this.message = "이메일 중복체크를 확인해주세요.";
      return false;
    }
    if (this.isEmailIncorrect) {
      this.message = "이메일이 유효하지 않습니다.";
      return false;
    }

    if (this.isEmailDuplicate) {
      this.message = "이메일이 중복됩니다.";
      return false;
    }

    return true;
  }

  public getMessage() {
    return this.message;
  }

  static createDefault() {
    return new ErrorClass();
  }
}

export const labelfont = () => {
  return "block text-gray-700 mb-2 hover:text-red-400 font-semibold";
};
export const inputcss = () => {
  return "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-2";
};
export const errormsg = () => {
  return "flex block items-center ml-auto text-gray-700";
};
export const normalButton = () => {
  return "bg-white hover:bg-red-400 hover:border-red-100 hover:text-red-100 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow ml-4 ml-auto";
};
export interface Props {
  SetValue: Function;
  error: [ErrorClass, Function];
}

export const IdBox = ({ SetValue, error }: Props) => {
  const [err, setError] = error;
  const cloneError = new ErrorClass(err);

  const [validIdMessage, ] = useState("");

  // 서버쪽에서 중복 여부만 res받으면 없어질 코드
  const [id, setId] = useState("");
  const instance: AxiosInstance = useAxiosInstanceNoToken();

  useEffect(() => {
    SetValue(id);
    if (id === "") {
      cloneError.isIdEmpty = true;
    } else {
      cloneError.isIdEmpty = false;
    }
    setError(cloneError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const HandleId = (e: any) => {
    SetValue(e.target.value);
    setId(e.target.value);

    cloneError.isNeedchkDuplicate = true;
    setError(cloneError);
  };

  const CheckDuplicate = (e: any) => {
    if (id === "") {
      return;
    }

    instance
      .get(`/check/user/${id}`)
      .then((response) => {
        if (response.data) {
          alert("사용 가능한 아이디입니다. ");
          cloneError.isDuplicate = false;
        } else {
          alert("중복된 아이디입니다. ");
          cloneError.isDuplicate = true;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("중복 검사에 실패했습니다.");
      });
    cloneError.isNeedchkDuplicate = false;
    e.preventDefault();
    setError(cloneError);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <label htmlFor="id" className={labelfont()}>
          ID{" "}
        </label>
        <button onClick={CheckDuplicate} className={normalButton()}>
          중복확인
        </button>
      </div>
      <div className="flex items-center mt-2">
        <input
          type="text"
          id="id"
          placeholder="아이디"
          required
          onChange={HandleId}
          className={inputcss()}
        />
      </div>
      <div className={errormsg()}>{validIdMessage}</div>
    </div>
  );
};

export const PwBox = ({ SetValue, error }: Props) => {
  const [err, setError] = error;
  const cloneError = new ErrorClass(err);
  const [chkPw, setChkPw] = useState("");
  const [regPw, setRegPw] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const HandlePw = (e: any) => {
    SetValue(e.target.value);
    setRegPw(e.target.value);
  };

  const HandlechkPw = (e: any) => {
    setChkPw(e.target.value);
  };

  useEffect(() => {
    cloneError.isPwEmpty = false;
    if (regPw === chkPw) {
      setPwMessage("비밀번호가 일치합니다.");
      cloneError.isPwIncorrect = false;
    } else {
      setPwMessage("비밀번호가 일치하지 않습니다.");
      cloneError.isPwIncorrect = true;
    }

    if (regPw === "") {
      setPwMessage("비밀번호를 입력해주세요.");
      cloneError.isPwEmpty = true;
    } else if (chkPw === "") {
      setPwMessage("비밀번호 확인을 입력해주세요.");
      cloneError.isPwEmpty = true;
    }
    setError(cloneError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regPw, chkPw]);

  return (
    <div className="flex flex-col mt-4">
      <div className="flex items-center">
        <label htmlFor="pw" className={labelfont()}>
          비밀번호{" "}
        </label>
      </div>
      <div className="flex items-center">
        <div className="flex-grow">
          <input
            type="password"
            id="pw"
            placeholder="비밀번호"
            onChange={HandlePw}
            required
            className={inputcss()}
          />
        </div>
      </div>
      <div className="flex items-center mt-2">
        <label htmlFor="cpw" className={labelfont()}>
          비밀번호확인{" "}
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="password"
          id="cpw"
          placeholder="비밀번호 확인"
          onChange={HandlechkPw}
          required
          className={inputcss()}
        />
      </div>

      <div className={errormsg()}>{pwMessage}</div>
    </div>
  );
};

export const NameBox = ({ SetValue, error }: Props) => {
  const [err, setError] = error;
  const cloneError = new ErrorClass(err);

  const HandleName = (e: any) => {
    let name = e.target.value;
    SetValue(name);
    if (name === "") {
      cloneError.isNameEmpty = true;
    } else {
      cloneError.isNameEmpty = false;
    }
    setError(cloneError);
  };
  return (
    <div className="flex flex-col mt-4">
      <div className="flex items-center">
        <label htmlFor="name" className={labelfont()}>
          성명{" "}
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          id="name"
          placeholder="성명"
          required
          onChange={HandleName}
          className={inputcss()}
        />
      </div>
    </div>
  );
};

export const CalendarBox = ({ SetValue, error }: Props) => {
  const [err, setError] = error;
  const cloneError = new ErrorClass(err);
  const HandleCalendar = (e: any) => {
    let calendar = e.target.value;
    SetValue(calendar);
    if (calendar === "") {
      cloneError.isCalendarEmpty = true;
    } else {
      cloneError.isCalendarEmpty = false;
    }
    setError(cloneError);
  };
  return (
    <div className="flex flex-col mt-4">
      <div>
        <label htmlFor="email" className={labelfont()}>
          생년월일{" "}
        </label>
      </div>
      <div>
        <input
          type="date"
          name="dateOfBirth"
          onChange={HandleCalendar}
          required
          className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow w-full"
        ></input>
      </div>
    </div>
  );
};

export const EmailBox = ({ SetValue, error }: Props) => {
  const [err, setError] = error;
  const cloneError = new ErrorClass(err);
  const [emailValue, setEmailValue] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const instance: AxiosInstance = useAxiosInstanceNoToken();

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(emailValue)) {
      setEmailMessage("이메일 합격.");
      cloneError.isEmailIncorrect = false;
    } else {
      setEmailMessage("이메일이 형식이 아닙니다.");
      cloneError.isEmailIncorrect = true;
    }
    if (emailValue === "") {
      cloneError.isEmailEmpty = true;
      setEmailMessage("이메일을 입력해 주세요.");
    } else {
      cloneError.isEmailEmpty = false;
    }
    cloneError.isNeedchkEmailDuplicate = true;
    setError(cloneError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailValue]);

  const HandleEmail = (e: any) => {
    const email = e.target.value;
    SetValue(email);
    setEmailValue(email);
  };

  const CheckDuplicate = (e: any) => {
    if (emailValue === "") {
      return;
    }

    instance
      .get(`/check/email/${emailValue}`)
      .then((response) => {
        if (response.data) {
          cloneError.isEmailDuplicate = false;
          alert("사용 가능한 이메일입니다.");
        } else {
          cloneError.isEmailDuplicate = true;
          alert("중복되는 이메일입니다.");
        }
      })
      .catch((err) => {
        alert("이메일 중복 확인에 실피했습니다.");
      });

    cloneError.isNeedchkEmailDuplicate = false;
    e.preventDefault();
    setError(cloneError);
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="flex items-center">
        <label htmlFor="email" className={labelfont()}>
          이메일
        </label>
        <button onClick={CheckDuplicate} className={normalButton()}>
          중복확인
        </button>
      </div>
      <div className="flex items-center mt-2">
        <input
          type="text"
          id="email"
          placeholder="이메일"
          onChange={HandleEmail}
          required
          className={inputcss()}
        />
      </div>

      <div className={errormsg()}>{emailMessage}</div>
    </div>
  );
};
