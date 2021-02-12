//@flow

import * as React from "react";

import useSWR from "swr";

export type Props = {
  itemID: number,
  initialCount: number,
};

export default function GuestOrderPanel(props: Props): React.Node {
  let [count, setCount] = React.useState(props.initialCount);

  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, mutate } = useSWR(`/api/counts/${props.itemID}`, fetcher, {
    refreshInterval: 1000,
  });
  if (data != null && data.count != null && data.count != count) {
    setCount(data.count);
  }

  return (
    <>
      <td>
        <button
          onClick={() => {
            mutate(
              `/api/counts/${props.itemID}`,
              { ...data, count: Math.max(count - 1, 0) },
              false
            );
            fetch("/api/dec", {
              method: "POST",
              body: props.itemID.toString(),
            })
              .then((resp) => resp.json())
              .then(() => mutate(`/api/counts/${props.itemID}`));
          }}
        >
          -
        </button>
      </td>
      <td>
        <p>{count}</p>
      </td>
      <td>
        <button
          onClick={() => {
            mutate(
              `/api/counts/${props.itemID}`,
              { ...data, count: count + 1 },
              false
            );
            fetch("/api/inc", {
              method: "POST",
              body: props.itemID.toString(),
            })
              .then((resp) => resp.json())
              .then(() => mutate(`/api/counts/${props.itemID}`));
          }}
        >
          +
        </button>
      </td>
    </>
  );
}
