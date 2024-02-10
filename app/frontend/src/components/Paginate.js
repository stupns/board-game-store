import React from 'react';
import { Pagination } from 'react-bootstrap';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

function Paginate({ page, pages, isAdmin = false, keyword = '' }) {
    let url = !isAdmin ? '/' : '/admin/productlist/';
    url += keyword ? `?keyword=${keyword}&` : '?';
    page = Number(page);

    return pages > 1 && (
        <Pagination>
            <Pagination.First as={Link} to={`${url}page=1`} disabled={page === 1} />
            <Pagination.Prev as={Link} to={`${url}page=${page - 1}`} disabled={page === 1} />

            {[...Array(pages).keys()].map(x => (
                <Pagination.Item key={x + 1} active={x + 1 === page} as={Link} to={`${url}page=${x + 1}`}>
                    {x + 1}
                </Pagination.Item>
            ))}

            <Pagination.Next as={Link} to={`${url}page=${page + 1}`} disabled={page === pages} />
            <Pagination.Last as={Link} to={`${url}page=${pages}`} disabled={page === pages} />
        </Pagination>
    );
=======
import { useLocation } from "react-router-dom";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

function Paginate({ page, pages, maxPageDisplay = 5, isAdmin = false }) {
    const query = useQuery();
    const keyword = query.get("keyword");

    let url = !isAdmin ? '/' : '/admin/productlist/';
    url += keyword ? `?keyword=${keyword}&` : '?';

    return (pages > 1 && (
        <Pagination>

            {/* First */}
            {pages !== 1 && page !== 1 ? (
                <Pagination.First href={`${url}page=1`}>First</Pagination.First>
            ) : (
                <Pagination.First disabled>First</Pagination.First>
            )}

            {/* Prev */}
            {page > 1 ? (
                <Pagination.Prev href={`${url}page=${page - 1}`}>&laquo;</Pagination.Prev>
            ) : (
                <Pagination.Prev disabled>&laquo;</Pagination.Prev>
            )}

            {/* Pages */}
            {[...Array(pages).keys()].map((x) => {
                if (page === x + 1) {
                    return (
                        <Pagination.Item key={x + 1} active href={`${url}page=${x + 1}`}>{x + 1}</Pagination.Item>
                    );
                } else if (x + 1 > page && x + 1 <= page + maxPageDisplay) {
                    return (
                        <React.Fragment key={x + 1}>
                            <Pagination.Item href={`${url}page=${x + 1}`}>{x + 1}</Pagination.Item>
                            {x + 1 === page + maxPageDisplay && x + 1 < pages && (
                                <Pagination.Ellipsis href={`${url}page=${page + (maxPageDisplay + 1)}`} />
                            )}
                        </React.Fragment>
                    );
                } else if (x + 1 < page && x + 1 >= page - maxPageDisplay) {
                    return (
                        <React.Fragment key={x + 1}>
                            {x + 1 === page - maxPageDisplay && x + 1 > 1 && (
                                <Pagination.Ellipsis href={`${url}page=${page - (maxPageDisplay + 1)}`} />
                            )}
                            <Pagination.Item href={`${url}page=${x + 1}`}>{x + 1}</Pagination.Item>
                        </React.Fragment>
                    );
                } else {
                    return null;
                }
            })}

            {/* Next */}
            {page < pages ? (
                <Pagination.Next href={`${url}page=${page + 1}`}>&raquo;</Pagination.Next>
            ) : (
                <Pagination.Next disabled>&raquo;</Pagination.Next>
            )}

            {/* Last */}
            {pages !== page ? (
                <Pagination.Last href={`${url}page=${pages}`}>Last</Pagination.Last>
            ) : (
                <Pagination.Last disabled>Last</Pagination.Last>
            )}

        </Pagination>
    ));
>>>>>>> 9b6d810 (Merging frontend with backend.)
}

export default Paginate;