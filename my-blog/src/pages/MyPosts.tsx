import React from "react";                                                                                                      
import { MyPostsProps } from "../interfaces/PostType";
import PostList from "../components/PostList";                                  
                                                                                    
const MyPosts: React.FC<MyPostsProps> = ({                                                                  
  user,                                                                             
  posts,                                                                                                                                                    
  editPost,                                                                         
  deletePost,                                                                       
}) => {                                                                             
  const myPosts = posts?.filter((post) => post.author === user?.username);           
  return (                                                                          
    <PostList                                                                       
      user={user}                                                                   
      posts={myPosts}                                                                                                                       
      editPost={editPost}                                                           
      deletePost={deletePost}                                                       
    />                                                                              
  );                                                                                
};                                                                                  
export default MyPosts;     