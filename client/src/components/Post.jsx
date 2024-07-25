import formatISO9075 from "date-fns/formatISO9075";

export default function Post({
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="image">
        <img src={`${process.env.REACT_APP_API_UPLOAD}` + cover} alt="" />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a href="" className="author">
            {author.username}
          </a>
          <time>{formatISO9075(createdAt)}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
