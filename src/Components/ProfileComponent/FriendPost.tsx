import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { GetPublishedBlogItem } from '../../DataServices/DataServices';
import { useContext } from 'react'
import UserContext from '../../UserContext/UserContext';

interface BlogItem {
    date: string;
    id: number;
    image: string;
    isDeleted: false;
    isPublish: false;
    publishedName: string;
    description: string;
    title: string;
    userid: number;
    // Other properties of a BlogItem
  }

  type pictureprops = {
    picture: string;
  }

export default function FriendPost(props: pictureprops) {
    const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
    const [blogUserId, setBlogUserId] = useState<number | null>(null);
    const data = useContext<any>(UserContext);

  
    useEffect(() => {
      const getLoggedInData = async () => {
        const loggedIn = data;
        setBlogUserId(loggedIn.name.userId);
        let userBlogItems = await GetPublishedBlogItem();
        setBlogItems(userBlogItems);
      };
        getLoggedInData();
    }, [data.name]);
    
    return (
        <>
        {blogItems.length > 0 ?
          blogItems.filter((item) => item.userid === blogUserId).filter((item) => item.isPublish).map((item: BlogItem, idx: number) => {
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString();
            return (
              <Row key={idx} style={{ marginTop: 20 }} className='d-flex postBG'>
                <Col lg={3} sm={2} xs={3}>
                  <Row className=' d-flex justify-content-center'>
                    <Col sm={8} xs={6}>
                      <img className="smallProfileIMG d-flex justify-content-center" src={props.picture} alt="profile" />
                      <div style={{fontWeight: 600}}>{item.publishedName}</div>
                    <div>{formattedDate}</div>
                      </Col>
                  </Row>
                </Col>
                <Col lg={9} sm={10} xs={9}><Row>
                <Col  lg={12} xs={12} className="d-flex justify-content-end">
                  <div className="textArea ">{item.description}</div>
                </Col>
                </Row></Col>
              </Row>
            )
          }) :  <div className='Loading-DivPost'>
          <div className="load-wrapp2">
            <div className="load-6">
              <div className="letter-holder2">
                <div className="l-1 letter">L</div>
                <div className="l-2 letter">o</div>
                <div className="l-3 letter">a</div>
                <div className="l-4 letter">d</div>
                <div className="l-5 letter">i</div>
                <div className="l-6 letter">n</div>
                <div className="l-7 letter">g</div>
                <div className="l-8 letter">.</div>
                <div className="l-9 letter">.</div>
                <div className="l-10 letter">.</div>
              </div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
        }
      </>
    );
    
    
  }
  