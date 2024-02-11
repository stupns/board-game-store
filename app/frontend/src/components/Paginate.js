import React from 'react';
import { Pagination } from 'react-bootstrap';
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
}

export default Paginate;