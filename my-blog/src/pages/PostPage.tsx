import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardFooter,
  CardBody,
  Button,
} from "@patternfly/react-core";
import { Link } from "react-router-dom";
import BlogCardFooter from "../components/BlogCardFooter";
import { PostPageProps } from "../interfaces/PostType";

const PostPage: React.FC<PostPageProps> = ({ posts, user }) => {
  const { id } = useParams();
  const post = posts?.find((post) => post.id === Number(id));

  if (!post) return <div>loading---</div>;
  return (
    <div className="inner">
      <Card className="pf-u-mb-md">
        <CardTitle>{post.title}</CardTitle>
        <CardBody className="blog-card-body">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardBody>
        <CardFooter>
          <BlogCardFooter post={post} />
        </CardFooter>
      </Card>
      {post.author === user?.username && (
        <Link
          to={`/edit/${post.id}`}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button>编辑</Button>
        </Link>
      )}
    </div>
  );
};

export default PostPage;