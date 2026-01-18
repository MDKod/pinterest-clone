import GalleryItem from "../galleryItem/galleryItem";
import "./gallery.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Skeleton from "../skeleton/skeleton";

const fetchPins = async ({ pageParam = 0, search, userId, boardId }) => {
  const baseUrl = import.meta.env.VITE_API_ENDPOINT;
  if (!baseUrl) {
    throw new Error("VITE_API_ENDPOINT is missing in .env");
  }
  const params = new URLSearchParams();
  params.append("cursor", String(pageParam));
  // Filtreler varsa ekle, yoksa ekleme
  if (search) params.append("search", search);
  if (userId) params.append("userId", userId);
  if (boardId) params.append("boardId", boardId);
  const res = await axios.get(
    `${baseUrl}/pins?${params.toString()}`
  );
  return res.data;
};
const Gallery = ({ search, userId, boardId }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["pins", search ?? "", userId ?? "", boardId ?? ""],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      fetchPins({ pageParam, search, userId, boardId }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });
  if (status === "pending") return <Skeleton />;
  if (status === "error") {
    return (
      <div style={{ padding: 12 }}>
        <p>Something went wrong.</p>
        <pre style={{ whiteSpace: "pre-wrap", opacity: 0.7 }}>
          {error?.message}
        </pre>
      </div>
    );
  }
  const allPins =
    data?.pages?.flatMap((page) => page?.pins ?? []) ?? [];
  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more pins...</h4>}
      endMessage={<h3>All Posts Loaded!</h3>}
    >
      <div className="gallery">
        {allPins.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};
export default Gallery;