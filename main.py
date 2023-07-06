#---------변수선언
# a = 1
# print(a);
# 배열 = [1,2,3,4,5]
# print(배열[0])
# 변수 = ''
# 뱐스 = 슷지
# 줄바꿈을 통해 끝을 알린다

#---------if문 사용
# if a==2:
#     print(2)
# else:
#     print(5)

#-------Class 선언
# class A_가수:
#     def 장르():
#         print('재즈')
#     def 이름():
#         print('아무개')
        
# A_가수.이름()
# A_가수.장르()

#--------함수 선언
# def sayHello():
#     print('안녕하세요')
    
# sayHello()

#--------boolean 함수
# if True & False: #| = or , > = 크거나 같다 , & = 그리고
#     print('참')

#-------for문 선언
# for i in range(1,5):
#     print(i)

#공식문서에 나와있다. (fastAPI 첫걸음)
# from fastapi import FastAPI
# from pydantic import BaseModel

# app = FastAPI()

# class Item(BaseModel):
#     id:int
#     content:str

# items = ['맥북','애플워치','아이폰','에어팟']

# 웹서버 만들기
# @app.get('/items')
# def read_items():
#     return items

#패스 id 값을 통해 함수 호출
# @app.get('/items/{id}')
# def read_id_item():
#     return items[int(id)]

# #쿼리 skip이라는 쿼리는 int, 즉 숫자 값이고 초기는 0
# # limit 는 변수도 정수고, 아무것도 안들어오면 0의 값을 가진다.
# @app.get('/items/')
# def read_id_item(skip:int=0,limit:int=0):#하나를 스킵하고 2개를 뽑아주세요 http://127.0.0.1:8000/items/?skip=1&limit=2
#     return items[skip:skip+limit] #아이템 배열을 뽑아내는 배열

# #get = 조회, post = 값을 새로 등록해주세요
# @app.post("/items")
# def post_item(item:Item):
#     #업데이트
#     items.append(item.content)
#     return '성공했습니다.'


from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles #정적파일을 서버에 주입해주는 헤더

app = FastAPI()

answer = 'TRAIN' #오늘의 정답

# 정답을 리턴해줄거임
@app.get('/answer')
def get_answer():
    return answer

app.mount("/", StaticFiles(directory="static", html = True), name="static")