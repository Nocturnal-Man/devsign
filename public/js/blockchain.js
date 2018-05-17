/*
  Read This
  - 주석으로 예상되는 """ blabla """ &  #blabla 이거 두개 다 주석처리했음.
  - raise InvalidBlockchain() 전부 console.log() 로 바꿈.
  - 안 고쳐진 부분있으니 원래 파이썬 파일과 반드시 비교해 봐야함
*/


/*----까지 FireBase 바꿔주셈*/
firebase = firebase.FirebaseApplication('https://devsign-a7066.firebaseio.com', None)

#Firebase에서 ID와 Phone 가져오기
ID = firebase.get('/USER', 'ID')
Phone = firebase.get('/USER', 'PHONENUM')

#ID와 Phone 번호 조합
m = ID + Phone

print(m);   //아마도 console.log(m); 이지 않을까 싶음.
//--------------------------------------------------------------------------

// https://www.npmjs.com/package/hashlib 참고
var hashlib = require("./build/default/hashlib");
var time = new Date();

//이 부분 확실히 모르겠음. 위의 코드라인 20번 사이트에서 참고해서 쓴 거임.
//64자리 고유번호
var Num = hashlib.sha256(m);

class Message{
	function __init__(self, data){
		self.hash = null;
		self.prev_hash = null;

    //https://www.w3schools.com/jsref/jsref_obj_date.asp
    self.timestamp = time.toLocaleDateString() + " " + toLocaleTimeString();

    //http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html 참고함.
    self.size = encodeURIComponent(data).length;

    self.data = Num;
		self.payload_hash = self._hash_payload();
  }

	/*
  //시간 + 고유번호 -> sha256 해시함수를 이용하여 16진수로 암호화
  -hexdigest : https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  -bytearray typecast : https://developer.mozilla.org/ko/docs/Web/JavaScript/Typed_arrays
  -utf-8 : encodeURIComponent()
  */
	function _hash_payload(self){
    var encoded = encodeURIComponent(new Int8Array(String(self.timestamp) + String(self.data)));
    return parseInt(hashlib.sha256(encoded), 16);
  }

  //코드라인 45~50 주석 참고.
  //이전 해시 + 페이로드의 해시 -> sha256 해시함수를 이용하여 16진수로 암호화
	function _hash_message(self){
    var encoded =  encodeURIComponent(new Int8Array(String(self.prev_hash) + self.payload_hash));
    return parseInt(hashlib.sha256(encoded), 16);
  }

	function link(self, message){
		// """ 해시를 통해 이전 메시지에 링크"""
		self.prev_hash = message.hash;
  }

	function seal(self){
		// """ 해시 메시지를 획득. """
		self.hash = self._hash_message();
  }

	function validate(self){
		// """ 메시지 유효성 검사 """

    /*
      raise 부분은 예외처리를 하는 출력문이다.
      console.log()함수로 처리했다.
    */
		if(self.payload_hash != self._hash_payload())
      console.log("Invalid payload hash in message: " + str(self));
		if(self.hash != self._hash_message())
      console.log("Invalid payload hash in message: " + str(self));
  }

	//클래스의 해시, 이전 해시, 데이터의 22번째 요소까지 출력

  /*
  return 뒤에 JavaScript용으로 변환하는 법 모르겠다.
  https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function
  위의 홈페이지를 참고하여 바꿀 수 있을 듯 하나 손도 대지 못했다.
  */
  def __repr__(self):
		return 'Message<hash: {}, prev_hash: {}, data: {}>'.format(
			self.hash, self.prev_hash, self.data[:20]
		)
}

class Block{
	function __init__(self, *args){
		self.messages = [];
		self.timestamp = null;
		self.prev_hash = null;
		self.hash = null;

		if(args)
			for(arg in args)
				self.add_message(arg);
  }


	//이전 해시 + 시간 + 이전 메시지의 해시 -> sha256 해시함수를 이용하여 16진수로 암호화
  //코드라인 45~50번 주석 참고.
	function _hash_block(self){
    var encoded =  encodeURIComponent(new Int8Array(String(self.prev_hash) + String(self.messages[-1].hash)));
    return parseInt(hashlib.sha256(encoded), 16);
  }

	//메시지의 길이가 0보다 크면
	function add_message(self, message){
		if ( (self.messages).legnth > 0 )
			message.link(self.messages[-1]);

		message.seal();
		message.validate();
		(self.messages).concat(message);
  }

	function link(self, block){
		/* 블록 해시는 헤드 메시지 해시만 통합하여
			이전 해시를 모두 전이적으로 포함. */
		self.prev_hash = block.hash;
  }

  //코드라인 36번과 동일한 방식으로 진행
	function seal(self){
		self.timestamp = time.toLocaleDateString() + " " + toLocaleTimeString();
		self.hash = self._hash_block();
  }

	function validate(self){
		/* 각 메시지 해시를 확인한 다음 무결성, 블록 해시를 확인.
			각 메시지의 유효성 검사 메소드(validate())를 호출.

			메시지 유효성 검사에 실패하면 이 메소드는 예외를 검출.
			잘못된 메시지가 전체 블록을 무효화하므로 InvalidBlock을 실행.
		*/

    /*
    포문 조건식에서
    enumerate(python function) -> ?? (JavaScript)
    - https://stackoverflow.com/questions/34336960/what-is-the-es6-equivalent-of-python-enumerate-for-a-sequence
    - 뭔말인지 모르겠으니 이것도 부탁드려연
    */
		for( (i, msg) in enumerate(self.messages)):
			try{
				msg.validate();

        //i가 0보다 크고 메시지의 이전 해시값이 i-1번째의 해시값과 다르면 실행
				if(i > 0 && msg.prev_hash != self.messages[i - 1].hash){
					//임의로 "유효하지 않은 블록" 에러 발생
					console.log(
						"Invalid block: Message #{} has invalid message link in block: {}".format(i, str(self)));
              //코드라인 88~92번 주석문 참고
        }
      }
      //예외 발생시 "유효하지 않은 메시지" 출력
      //try-catch가 한 세트인데 'except InvalidMessage as ex:' 이건 뭘까요?
			except InvalidMessage as ex:
				console.log("Invalid block: Message #{} failed validation: {}. In block: {}".format(
					i, str(ex), str(self));
            //코드라인 88~92번 주석문 참고
				)
  }

	//해시, 이전해시, 메시지, 시간 출력
	function __repr__(self){
		return 'Block<hash: {}, prev_hash: {}, messages: {}, time: {}>'.format(
			self.hash, self.prev_hash, len(self.messages), self.timestamp
		)
    //코드라인 88~92번 주석문 참고
  }
}


class SimpleChain{
	function __init__(self){
		self.chain = [];
  }

	//블록 추가
	function add_block(self, block){
		// 유효성이 확인되면 블록 추가
		if (len(self.chain) > 0)
			block.prev_hash = self.chain[-1].hash;

		block.seal();
		block.validate();
		self.chain.append(block);
  }

/*
코드라인 141~174번 validate와 같은 부분 해결 못함.
*/
	function validate(self){
		/* 각 블록의 순서 확인.
			블록이 잘못되면 체인이 무효화 됨.
		*/
		for(i, block in enumerate(self.chain)){
			try{
				block.validate();
      }
			except InvalidBlock as exc:
				console.log("Invalid blockchain at block number {} caused by: {}".format(i, str(exc)));
        //코드라인 88~92번 주석문 참고
    }
    return true;
  }

	function __repr__(self){
		return 'SimpleChain<blocks: {}>'.format(len(self.chain));
    //코드라인 88~92번 주석문 참고
  }
}



//유효하지 않은 메시지
class InvalidMessage(Exception){
	function __init__(self, *args, **kwargs){
		Exception.__init__(self, *args, **kwargs);
  }
}

//유효하지 않은 블록
class InvalidBlock(Exception){
	function __init__(self, *args, **kwargs){
		Exception.__init__(self, *args, **kwargs);
  }
}

//유효하지 않은 블록체인
class InvalidBlockchain(Exception){
	function __init__(self, *args, **kwargs){
		Exception.__init__(self, *args, **kwargs);
  }
}


/*
  manager()에서 input, print 변환 모르겠음.
*/
def manager(){
	chain = SimpleChain();
	block = Block();
	msg = """
    블록 체인의 기본 구현..

		Action set:
		- 기존 블록에 메시지 추가            (1)
		- 체인에 기존 블록 추가              (2)
		- 블록 표시(색인 표시)               (3)
		- 전체 체인 표시                     (4)
		- 체인 무결성 검증                   (5)
		- 프로그램 종료                      (6)

		체인의 무결성이 손상되면 유효성 검사 작업으로 인해 프로그램이 중지됨.
		""";
	print(msg);
	while(true){
		print();

		decide = input("Your action: ");

		//기존 블록에 메시지 추가
		if(decide == "1")
			block.add_message(Message(input("데이터 입력 : ")));

		//체인에 기존 블록 추가
		else if(decide == "2"){
			if((block.messages).length > 0){
				chain.add_block(block);
				block = Block();
      }
    }

		//블록 표시(색인 표시)
		else if(decide == "3"){
			index = int(input("인덱스 제공 : "));

			if(len(chain.chain) > 0){
				try{ print(chain.chain[index]); }
				except:
					print("문제 발생");
      }
    }

		//전체 체인 표시
		else if(decide == "4"){
			for(b in chain.chain){
				print(b);
				print("----------------");
      }
    }

    //체인 무결성 검증
    else if(decide == "5")
      if(chain.validate())
        print("Integrity validated.");

    else
      break;
  }
}



if __name__ == "__main__":
	manager()
