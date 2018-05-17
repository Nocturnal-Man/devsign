from firebase import firebase
import hashlib

firebase = firebase.FirebaseApplication('https://devsign-a7066.firebaseio.com', None);

#Firebase에서 ID와 Phone 가져오기
ID = firebase.get('/USER', 'ID');
Phone = firebase.get('/USER', 'PHONENUM');

#ID와 Phone 번호 조합
m = ID + Phone;

print(m);

//64자리 고유번호
Num = hashlib.sha256(m.encode("utf-8")).hexdigest();

print(Num);
