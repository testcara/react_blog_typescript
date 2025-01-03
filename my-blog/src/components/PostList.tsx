import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Grid,
  GridItem,
  Button,
  FlexItem,
  Flex,
} from "@patternfly/react-core";
import PaginationComponent from "./PaginationComponent";
import {
  AlertDeletionModal,
} from "../components/AlertModal";
import BlogCard from "./BlogCard";
import { Post, PostListProps } from "../interfaces/PostType";

const PostList: React.FC<PostListProps>= ({
  user,
  posts,
  deletePost,
  editPost,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;
  const navigate = useNavigate();

  // 打开 Modal
  const openModal = (post: Post) => {
    setPostToDelete(post);
    setIsModalOpen(true);
  };

  // 关闭 Modal
  const closeModal = () => {
    setPostToDelete(null);
    setIsModalOpen(false);
  };



  // 确认删除操作
  const confirmDelete = () => {
    if (postToDelete) {
      deletePost(Number(postToDelete?.id));
    }
    closeModal();
  };

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="inner pf-u-mb-lg ">
        <PaginationComponent
          itemCount={posts?.length}
          perPage={pageSize}
          page={currentPage}
          onPageChange={handlePageChange}
        />
        <Grid hasGutter={false} >
          {currentPosts?.map((post) => {
            return (
              <GridItem key={post.id} >
                <Card className="pf-u-p-md">
                  <Flex direction={{ default: "column" }}>
                    {/* 博客内容 */}
                    <FlexItem>
                      <BlogCard post={post} />
                    </FlexItem>
                    {/* 操作按钮放在一排，居右 */}
                    <Flex
                      justifyContent={{ default: "justifyContentFlexEnd" }}
                      spaceItems={{ default: "spaceItemsMd" }}
                    >
                      <FlexItem>
                        <Button
                          style={{
                            display:
                              post.author === user?.username
                                ? "inline-block"
                                : "none",
                          }}
                          onClick={() => openModal(post)}
                        >
                          删除
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button
                          style={{
                            display:
                              post.author === user?.username
                                ? "inline-block"
                                : "none",
                          }}
                          onClick={() => navigate(`/edit/${post.id}`)}
                        >
                          更改
                        </Button>
                      </FlexItem>
                    </Flex>
                  </Flex>
                </Card>
              </GridItem>
            );
          })}
        </Grid>
        {/* 使用 AlertModal */}
        <AlertDeletionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          title="确认删除"
          message="确定删除这篇博客吗？"
          confirmButtonLabel="删除"
          cancelButtonLabel="取消"
        />
      </div>
    </>
  );
};

export default PostList;