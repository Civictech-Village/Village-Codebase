export default function RemadePosts() {
  return (
        <div id="single-post" style={{ padding: "2rem", border: "0.1rem solid black", borderRadius: "1rem"}}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div id="userinfo" style={{ display: "flex" }}>
                                    <img src="https://res.cloudinary.com/ddj0t5srx/image/upload/v1687093019/Screenshot_2023-04-24_205656_qojx4t.png" alt="Pfp" style={{ width: "8rem", height: "8rem", borderRadius: "50%" }}/>
                                    <div>
                                        <h1>username</h1>
                                        <h5>postdate</h5>
                                    </div>
                                </div>
                                <div id="options" style={{ padding: "2rem" }}>
                                <i className="material-icons">more_horiz</i>
                                </div>
                            </div>
                            <div id="post-body">
                                <div style={{ margin: "1rem 0px" }}>
                                    <img style={{ width: "100%" }}src="https://res.cloudinary.com/ddj0t5srx/image/upload/v1686773178/samples/landscapes/architecture-signs.jpg" alt="" />
                                </div>
                                <div id="caption">
                                    <p><strong>Username</strong>: Captions goes here </p>
                                </div>
                                <div id="heartsandcomments" style={{ display: "flex" }}>
                                    <i className="material-icons">thumb_up</i>
                                    <p style={{ marginRight: "1rem" }}>99999</p>
                                    <i className="material-icons">add_comment</i>
                                    <p style={{ marginRight: "1rem" }}>99999</p>
                                </div>
                            </div>
                    </div>
  );
}
