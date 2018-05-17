import datatime
import hashlib
import time
from firebase import firebase
import FIrebaseNum

var config = {
  apiKey:"AIzaSyCB-UAilnsfNeHFcPZTAGwVK5dxDZ5n6F0",
      authDomain: "devsign-a7066.firebaseapp.com",
      databaseURL: "https://devsign-a7066.firebaseio.com",
      projectId: "devsign-a7066",
      storageBucket: "devsign-a7066.appspot.com",
      messagingSenderId: "1098166753532"
};

class Message{
  function __init__(self, data){
    self.hash = NULL;
    self.prev_hash = NULL;
    self.timestamp = time.time();
    self.size = len(data.encode('utf-8'));
    self.data = data;
    self.payload_hash = self._hash_payload();
  }

  function _hash_payload(self){
    return hashlib.sha256(bytearray(str(self.timestamp) + str(self.data), "utf-8")).hexdigest();
  }

  function _hash_message(self){
    hashlib.sha256(bytearray(str(self.prev_hash) + self.payload_hash, "utf-8")).hexdigest();
  }

  function link(self, message){
    self.prev_hash = message.hash;
  }

  function seal(self){
    self.hash = self._hash_message();
  }

  function validate(self){
    if(self.payload_hash != self._hash_payload())
      //출력문 들어가야됨
      ;
    if(self.hash != self._hash_message())
      //출력문 들어가야됨;
      ;
  }

  function __repr__(self){
    return 'Message<hash: {}, prev_hash: {}, data: {}>'.format(
			self.hash, self.prev_hash, self.data[:20]
		);
  }
}


class Block{
  function __init__(self, *args){
    self.message = [];
    self.timestamp = NULL;
    self.prev_hash = NULL;
    self.hash = NULL;

    if(args){
      for(var i=0; i<args.length; i++){
        self.add_message(args[i]);
      }
    }
  }

  function _hash_block(self){
    return hashlib.sha256(
			bytearray(str(self.prev_hash) + str(self.timestamp) + self.messages[-1].hash, "utf-8")).hexdigest();
  }

  function add_message(self, message){
    if(len(self.messages) > 0){
      message.link(self.messages[-1]);
    }
    message.seal();
    message.validate();
    self.messages.append(message);
  }

  function link(self, block){
    // 블록 해시는 헤드 메시지 해시만 통합하여
		//	이전 해시를 모두 전이적으로 포함.
    self.prev_hash = block.hash;
  }

  function seal(self){
    self.timestamp = time.time();
    self.hash = self._hash_block();
  }

  function validate(self){
    /*각 메시지 해시를 확인한 다음 무결성, 블록 해시를 확인.
			각 메시지의 유효성 검사 메소드(validate())를 호출.

			메시지 유효성 검사에 실패하면 이 메소드는 예외를 검출.
			잘못된 메시지가 전체 블록을 무효화하므로 InvalidBlock을 실행.
		*/
    // 수정필요
    for i, msg in enumerate(self.messages){
			try{
				msg.validate();
				if(i > 0 && msg.prev_hash != self.messages[i - 1].hash)
					raise InvalidBlock(
						"Invalid block: Message #{} has invalid message link in block: {}".format(i, str(self)))
      }
      catch InvalidMessage as ex{
				raise InvalidBlock("Invalid block: Message #{} failed validation: {}. In block: {}".format(
					i, str(ex), str(self))
				)
      }
    }
  }

  function __repr__(self){
		return 'Block<hash: {}, prev_hash: {}, messages: {}, time: {}>'.format(
			self.hash, self.prev_hash, len(self.messages), self.timestamp
		);
  }
}



class SimpleChain{
	function __init__(self){
		self.chain = [];
  }

	function add_block(self, block){
		""" Add a block if valid."""
		if(len(self.chain) > 0){
			block.prev_hash = self.chain[-1].hash;
    )
		block.seal();
		block.validate();
		self.chain.append(block);
  }
	function validate(self) {
		""" 각 블록의 순서 확인.
			블록이 잘못되면 체인이 무효화 됨.
		"""
		for i, block in enumerate(self.chain){

    }
			try{
				block.validate();
      }
			catch InvalidBlock as exc{
				raise InvalidBlockchain("Invalid blockchain at block number {} caused by: {}".format(i, str(exc)))
      }
    return True;
  }

	function __repr__(self){
		return 'SimpleChain<blocks: {}>'.format(len(self.chain));
  }

class InvalidMessage(Exception){
	function __init__(self, *args, **kwargs){ Exception.__init__(self, *args, **kwargs); }
}

class InvalidBlock(Exception){
	function __init__(self, *args, **kwargs){ Exception.__init__(self, *args, **kwargs); }
}

class InvalidBlockchain(Exception){
	function __init__(self, *args, **kwargs){ Exception.__init__(self, *args, **kwargs); }
}


function manager(){
	chain = SimpleChain();
	block = Block();
	msg = """
    블록 체인의 기본 구현..


		Action set:
		- add message to the existing block  (1)
		- add existing block to the chain    (2)
		- show a block (index will be asked) (3)
		- show the whole chain               (4)
		- validate the chain integrity       (5)
		- exit the program                   (6)

		체인의 무결성이 손상되면 유효성 검사 작업으로 인핸 프로그램이 중지됨.
		""";
	print(msg);
	while(True){
		print();

		decide = input("Your action: ");

		if(decide == "1")
			block.add_message(Message(input("Enter your data:")));
		else if(decide == "2"){
			if(len(block.messages) > 0){
				chain.add_block(block);
				block = Block();
      }
			else
				print("Block is empty, try adding some messages");
      }
		else if(decide == "3"){
			index = int(input("Provide the index: "));
			if(len(chain.chain) > 0)
				try{
					print(chain.chain[index]);
        }
				catch{
					print("An issue occurred");
        }
      }
		else if(decide == "4"){
			for b in chain.chain{
				print(b);
				print("----------------");
      }
    }
		else if(decide == "5")
			if(chain.validate())
        print("Integrity validated.");
		else
			break;
    }
}


function main(){
	manager();
}
