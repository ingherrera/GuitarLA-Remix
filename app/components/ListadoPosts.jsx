import Post from "./Post";

export default function ListadoPosts({posts}) {
  // console.log("-----------------ListadoPosts---------------")
  // console.log("guitarras=",posts)
  return (
    <>
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {posts.map(post =>(
          <Post
            key={post.id}
            post={post.attributes}
          />
        ))}
      </div>
    </>
  )
}
