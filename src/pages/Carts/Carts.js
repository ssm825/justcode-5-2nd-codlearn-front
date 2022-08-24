import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import BASE_URL from '../../config';
import CartCourse from '../../components/Carts/CartCourse';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faX,
  faCircleQuestion,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
library.add(faX, faCircleQuestion, faAngleDown);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 1160px;
  max-width: 1160px;
  margin: 0 auto;
`;

const LeftCart = styled.div`
  width: 828px;
  max-width: 828px;
  margin-right: 32px;
  margin-bottom: 120px;
`;

const CartName = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1b1c1d;
  padding-top: 32px;
  padding-bottom: 16px;
`;

const EmptyCartWrapper = styled.div`
  margin-top: 114px;
  text-align: center;

  div {
    color: #3e4042;
    padding-bottom: 20px;
  }
`;

const ShowCoursesButton = styled.button`
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #00c471;
  border-radius: 4px;
  color: #00c471;
  font-weight: 500;
  background-color: #fff;
  cursor: pointer;
`;

const LeftCartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #1b1c1d;
  padding-bottom: 12px;
`;

const LeftCartHeaderLeft = styled.div`
  font-size: 15px;
  font-weight: 500;
`;

const SelectAll = styled.span`
  height: 22px;
  color: #1b1c1d;
`;

const ListCount = styled.span`
  height: 25px;
  font-size: 16px;
  font-weight: 400;
  color: #858a8d;
  padding-left: 4px;
`;

const ListSelected = styled.span`
  color: #00c471;
`;

const LeftCartHeaderButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 14px;
  font-weight: 700;
  color: #495057;
  background: #fff;
  border: 1px solid #d5dbe2;
  border-radius: 4px;
  padding: 0 12px;
  cursor: pointer;

  div {
    width: 14px;
    height: 14px;
    margin-left: 4px;
  }
`;

const RightCart = styled.div`
  width: 300px;
  max-width: 300px;
  min-width: 300px;
  padding-top: 32px;
`;

const BuyerInfo = styled.div`
  width: 300px;
  font-size: 14px;
  margin-bottom: 4px;
  padding: 16px 20px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background: #fff;
`;

const BuyerInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f1f3f5;
`;

const BuyerInfoHeaderLeft = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 700;
  color: #1b1c1d;

  div {
    display: flex;
    align-items: center;
    margin-left: 4px;
    color: #abb0b4;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const BuyerInfoHeaderRight = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  color: #b3edd4;
`;

const InputWrapper = styled.div`
  margin-top: 10px;
`;

const InputHeader = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
  color: #858a8d;

  span {
    color: #e5503c;
  }
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: #fff;

  input {
    width: 100%;
    font-size: 14px;
    border: 0;
    background: none;

    &:focus {
      outline: none;
    }
  }
`;

const PhoneWrapper = styled.div`
  display: flex;
`;

const PhoneInput = styled.div`
  display: flex;
  padding: 0 12px;
  width: 172px;
  height: 40px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #fff;

  input {
    width: 100%;
    font-size: 14px;
    border: 0;
    background: none;

    &:focus {
      outline: none;
    }
  }
`;

const CountryNumber = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 50px;
  height: 100%;
  margin-right: 10px;
`;

const NumIcon = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: #fff;
`;

const Num = styled.div`
  font-size: 14px;
`;

const NumList = styled.ul`
  position: absolute;
  top: 43px;
  left: -13px;
  width: 180px;
  height: 278px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background: #fff;
  list-style: none;
  z-index: 1;

  li {
    display: flex;
    flex-direction: row;
    padding: 8px;
  }
`;

const CountryNum = styled.p`
  width: 56px;
  color: #616568;
  cursor: pointer;
`;

const CountryName = styled.p`
  width: 75px;
  color: #616568;
  cursor: pointer;
`;

const SmallButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 78px;
  height: 40px;
  margin-left: 8px;
  padding: 0 12px;
  border: 1px solid #d5dbe2;
  border-radius: 4px;
  color: #495057;
  background: #fff;
  font-size: 14px;
  font-weight: 700;
`;

const VoucherInfo = styled(BuyerInfo)`

`;

const VoucherInfoHeader = styled(BuyerInfoHeader)`

`;

const VoucherInfoHeaderLeft = styled(BuyerInfoHeaderLeft)`

`;

const VoucherInfoHeaderRightText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #abb0b4;
`;

const VoucherInfoHeaderRightNum = styled.span`
  margin-left: 4px;
  font-size: 14px;
  font-weight: 700;
  color: #b3edd4;
`;

const PayButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  font-size: 16px;
  color: white;
  border-radius: 8px;
  background: green;
  cursor: pointer;
`;

function Carts() {
  const LoginToken = localStorage.getItem('token');

  const [courses, setCourses] = useState();
  const [checkedCourse, setCheckedCourse] = useState([]);
  const [checkId, setCheckId] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [isCountryNumList, setIsCountryNumList] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(isUpdated) {
      fetch(`${BASE_URL}/cart`, {
        method: 'GET',
        headers: {
          Authorization: LoginToken,
        },
      })
        .then(res => res.json())
        .then(data => {
          setCourses(data);
        });
    };
    setIsUpdated(false);
  }, [isUpdated]);

  const checkHandler = (checked, id) => {
    if (checked) {
      setCheckedCourse([...checkedCourse, id]);
    } else {
      setCheckedCourse(checkedCourse.filter(v => v !== id));
    }
  };

  const checkAllHandler = checked => {
    if (checked) {
      const checkedIdArray = [];
      courses?.data[0].class.forEach(e => checkedIdArray.push(e.class_id));
      setCheckedCourse(checkedIdArray);
    } else {
      setCheckedCourse([]);
    }
  };

  const deleteCourses = async classArray => {
    const classList = classArray.map(el => {
      return { class_id: el };
    });
    await fetch(`${BASE_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: LoginToken,
      },
      body: JSON.stringify(classList),
    });
    setIsUpdated(true);
  };

  useEffect(() => {
    if (checkId.length > 0) {
      deleteCourses(checkId);
    }
  }, [checkId]);

  const addCourses = async () => {
    const classList = checkedCourse.map(el => {
      return { class_id: el };
    });

    Promise.all(
      await fetch(`${BASE_URL}/my-classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: LoginToken,
        },
        body: JSON.stringify(classList),
      })
    );

    navigate('/my_courses');
  };

  return (
    <Wrapper>
      <LeftCart>
        <CartName>수강바구니</CartName>
        {courses?.data[0]?.class ? (
          <div>
            <LeftCartHeader>
              <LeftCartHeaderLeft>
                <input
                  onChange={e => {
                    checkAllHandler(e.target.checked);
                  }}
                  checked={
                    checkedCourse.length === courses?.data[0]?.class?.length
                  }
                  type="checkbox"
                  id="cb1"
                />
                <label for="cb1"></label>
                <SelectAll>전체선택</SelectAll>
                <ListCount>
                  <ListSelected>{checkedCourse.length}</ListSelected>/
                  <span>{courses?.data[0]?.class?.length}</span>
                </ListCount>
              </LeftCartHeaderLeft>
              <LeftCartHeaderButton onClick={e => deleteCourses(checkedCourse)}>
                선택삭제
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-x" />
                </div>
              </LeftCartHeaderButton>
            </LeftCartHeader>
            {courses &&
              courses?.data[0]?.class?.map((v, i) => (
                <CartCourse
                  key={i}
                  id={v.class_id}
                  img={v.class_img}
                  name={v.class_name}
                  instructor={v.instructor_name}
                  price={v.price}
                  checkHandler={checkHandler}
                  checkedCourse={checkedCourse}
                  setCheckId={setCheckId}
                />
              ))}
          </div>
        ) : (
          <EmptyCartWrapper>
            <div>
              <p style={{height: '24px',fontWeight: 700, fontSize: '16px'}}>담긴 강의가 없습니다.</p>
              <p style={{height: '24px', paddingTop: '4px', color: '#858a8d', fontSize: '14px'}}>나를 성장 시켜줄 좋은 지식들을 찾아보세요.</p>
            </div>
            <ShowCoursesButton onClick={() => {navigate('/courses')}}>강의리스트 보기</ShowCoursesButton>
          </EmptyCartWrapper>
        )
        }
      </LeftCart>
      <RightCart>
        <BuyerInfo>
          <BuyerInfoHeader>
            <BuyerInfoHeaderLeft>
              <span>구매자정보</span>
              <div>
                <FontAwesomeIcon icon="fa-solid fa-circle-question" />
              </div>
            </BuyerInfoHeaderLeft>
            <BuyerInfoHeaderRight>저장</BuyerInfoHeaderRight>
          </BuyerInfoHeader>
          <InputWrapper>
            <InputHeader>
              이름
              <span> * </span>
            </InputHeader>
            <InputBox>
              <input type="text" placeholder="실명 입력" />
            </InputBox>
          </InputWrapper>
          <InputWrapper>
            <InputHeader>
              이메일
              <span> * </span>
            </InputHeader>
            <InputBox>
              <input
                value={courses?.data[0]?.user?.email}
                type="email"
                placeholder="이메일 입력"
              />
            </InputBox>
          </InputWrapper>
          <InputWrapper>
            <InputHeader>
              휴대폰 번호
              <span> * </span>
              (숫자만 입력)
            </InputHeader>
            <PhoneWrapper>
              <PhoneInput>
                <CountryNumber>
                  <NumIcon>
                    <Num>+82</Num>
                    <div style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => {setIsCountryNumList(prev => !prev)}}>
                      <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                    </div>
                  </NumIcon>
                  <NumList style={isCountryNumList ? {display: 'block'} : {display: 'none'}}>
                    <li>
                      <CountryNum>+82</CountryNum>
                      <CountryName>대한민국</CountryName>
                    </li>
                    <li>
                      <CountryNum>+81</CountryNum>
                      <CountryName>일본</CountryName>
                    </li>
                    <li>
                      <CountryNum>+1</CountryNum>
                      <CountryName>미국</CountryName>
                    </li>
                    <li>
                      <CountryNum>+49</CountryNum>
                      <CountryName>독일</CountryName>
                    </li>
                    <li>
                      <CountryNum>+61</CountryNum>
                      <CountryName>오스트레일리아</CountryName>
                    </li>
                    <li>
                      <CountryNum>+52</CountryNum>
                      <CountryName>멕시코</CountryName>
                    </li>
                    <li>
                      <CountryNum>+32</CountryNum>
                      <CountryName>벨기에</CountryName>
                    </li>
                    <li>
                      <CountryNum>+55</CountryNum>
                      <CountryName>브라질</CountryName>
                    </li>
                    <li>
                      <CountryNum>+44</CountryNum>
                      <CountryName>영국</CountryName>
                    </li>
                  </NumList>
                </CountryNumber>
                <input />
              </PhoneInput>
              <SmallButton>인증요청</SmallButton>
            </PhoneWrapper>
          </InputWrapper>
        </BuyerInfo>
        <VoucherInfo>
          <div>
            <div>
              <div>
                <VoucherInfoHeader>
                  <VoucherInfoHeaderLeft>
                    <span>쿠폰</span>
                    <div>
                      <FontAwesomeIcon icon="fa-solid fa-circle-question" />
                    </div>
                  </VoucherInfoHeaderLeft>
                  <div>
                    <VoucherInfoHeaderRightText>사용가능</VoucherInfoHeaderRightText>
                    <VoucherInfoHeaderRightNum>0</VoucherInfoHeaderRightNum>
                  </div>
                </VoucherInfoHeader>
                <div>
                  <div>
                    <input />
                  </div>
                  <SmallButton>쿠폰선택</SmallButton>
                </div>
              </div>
              <div>
                <VoucherInfoHeader>
                  <VoucherInfoHeaderLeft>
                    <span>포인트</span>
                    <div>
                    <FontAwesomeIcon icon="fa-solid fa-circle-question" />
                    </div>
                  </VoucherInfoHeaderLeft>
                  <div>
                    <VoucherInfoHeaderRightText>보유</VoucherInfoHeaderRightText>
                    <VoucherInfoHeaderRightNum>0</VoucherInfoHeaderRightNum>
                  </div>
                </VoucherInfoHeader>
                <div>
                  <div>
                    <input />
                  </div>
                  <SmallButton>전액사용</SmallButton>
                </div>
              </div>
              <div>
                <span>선택상품 금액</span>
                <div>
                  <span>415800</span>
                  <span>원</span>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <span>할인금액</span>
                    <svg></svg>
                  </div>
                  <div>
                    <span>-35750</span>
                    <span>원</span>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <div>- 즉시할인</div>
                      <div>
                        <span>-35750</span>
                        <span>원</span>
                      </div>
                    </div>
                    <div>
                      <div>- 쿠폰할인</div>
                      <div>
                        <span>0</span>
                        <span>원</span>
                      </div>
                    </div>
                    <div>
                      <div>- 포인트사용</div>
                      <div>
                        <span>0</span>
                        <span>잎</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span>총 결제금액</span>
                <div>
                  <span>380050</span>
                  <span>원</span>
                </div>
              </div>
              <div>
                <i></i>
                <span>15%</span>
                할인받기
              </div>
              <PayButton onClick={addCourses}>결제하기</PayButton>
            </div>
            <div>
              <div>
                <label>
                  회원 본인은 주문내용을 확인했으며,
                  <span>구매조건 및 개인정보취급방침</span>과 결제에 동의합니다.
                </label>
              </div>
            </div>
          </div>
          <div>
            <div>
              <i></i>
              <span>문의 바로가기</span>
            </div>
          </div>
        </VoucherInfo>
      </RightCart>
    </Wrapper>
  );
}

export default Carts;
