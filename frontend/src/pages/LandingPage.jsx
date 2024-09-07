import "../styles/landing.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel } from 'react-bootstrap';
import globe from "../assets/globe.gif"

function LandingPage() {
    return (
        <div>
            {/*  hero section */}
            <section id="header">
                <div className="container-lg">
                    <div className="row g-4 justify-content-start align-items-center">
                        <div className="col-5 text-right">
                            <h1 className="display-3 header-text">
                                Share your travel experiences with Rover!
                            </h1>
                            <button href="" className="btn btn-lg rounded-pill purple-btn">Join Now!</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* features */}
            <section id="features">
                <div className="container-lg">
                    <div className="text-center mb-4">
                        <h2 className="section-title">The Rover Experience</h2>
                        <p className="lead section-subtitle">Revolutionizing <span className="bold">Travel</span> one step at a time</p>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-10 col-lg-6">
                            <div className="feature-title mb-4 ">
                                <h3 className="bold">Explore. Plan. Connect.</h3>
                                <p>Join Rover today and start mapping your adventures. Connect with travelers, share your stories, and show the world where you&apos;ve been!</p>
                            </div>
                            {/* features */}
                            <div className="feats">
                                <div className="feature mb-3">
                                    <div className="rounded-4 d-flex justify-content-center align-items-center">
                                        <i className="bi bi-globe-americas"></i>
                                    </div>
                                    <div className="feature-text">
                                        <h4>Map Your Adventures!</h4>
                                        <p>Showcase your adventures with your own personalized globe!</p>
                                    </div>
                                </div>
                                <div className="feature mb-3">
                                    <div className="rounded-4 d-flex justify-content-center align-items-center">
                                        <i className="bi bi-calendar2-week"></i>
                                    </div>
                                    <div className="feature-text">
                                        <h4>Plan Your Dream Trip!</h4>
                                        <p>Plan your next adventure with our itinerary creator!</p>
                                    </div>
                                </div>
                                <div className="feature mb-3">
                                    <div className="rounded-4 d-flex justify-content-center align-items-center">
                                        <i className="bi bi-chat-dots"></i>
                                    </div>
                                    <div className="feature-text">
                                        <h4>Interact with fellow travelers!</h4>
                                        <p>Rover is a safespace for travelers from all backgrounds!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-lg-6 featured-globe">
                            <img src={globe} className="text-center"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* reviews */}
            <section id="reviews">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-title">Reviews</h2>
                        <p className="lead section-subtitle">Hear what some of our clients have to say about our services!</p>
                    </div>
                    {/* bootstrap carousel */}
                    <div id="reviewsCarousel" className="carousel slide" data-bs-ride="carousel">
                        {/* carousel indicators */}
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#reviewsCarousel" data-bs-slide-to="0" className="active"
                                aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#reviewsCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#reviewsCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>

                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="testimonial">
                                    <img src="../images/client1.webp" className="rounded-circle testimonial-pic" alt="Client 1" />
                                    <div className="testimonial-text">
                                        <p></p>
                                        <em>-Cecilia Laterano</em>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="testimonial">
                                    <img src="../images/client1.webp" className="rounded-circle testimonial-pic" alt="Client 2" />
                                    <div className="testimonial-text">
                                        <p>njsncac</p>
                                        <em>-Daniel Verdugo</em>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="testimonial">
                                    <img src="../images/client1.webp" className="rounded-circle testimonial-pic" alt="Client 3" />
                                    <div className="testimonial-text">
                                        <p></p>
                                        <em>-Mike Wazoski</em>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  carousel button */}
                        <button className="carousel-control-prev" type="button" data-bs-target="#reviewsCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#reviewsCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* pricing */}
            <section id="pricing" className="bg-light">
                <div className="container-lg">
                    <div className="text-center">
                        <h2 className="section-title">Monthly Plans</h2>
                        <p className="lead section-subtitle">
                            Please note that your subscription will be charged on a monthly
                            basis.
                        </p>
                    </div>
                    {/* pricing cards */}
                    <div className="row my-5 align-items-center justify-content-center">
                        <div className="col-9 col-lg-4 my-3">
                            <div className="card text-center">
                                <div className="card-header orange">
                                    <span className="text-light lead">Traveler Tier</span>
                                </div>
                                <div className="card-body">
                                    <p className="display-4 my-3 fw-bold">
                                        $0
                                    </p>
                                    <p className="card-text text-muted d-sm-block">
                                        Create and Share Posts with other users.
                                    </p>
                                    <p className="card-text text-muted d-lg-block">
                                        Unlimited messaging.
                                    </p>
                                    <p className="card-text text-muted d-lg-block">
                                        Access to the globescratcher feature.
                                    </p>
                                    <button href="#" className="btn btn-lg orange-btn rounded-pill">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 col-lg-4 my-3">
                            <div className="card text-center">
                                <div className="card-header orange">
                                    <span className="text-light lead">Wayfarer Tier </span>
                                </div>
                                <div className="card-body">
                                    <p className="display-4 my-3 fw-bold">
                                        $2
                                    </p>
                                    <p className="card-text text-muted d-sm-block">
                                        No Ads!
                                    </p>
                                    <p className="card-text text-muted d-lg-block">

                                    </p>
                                    <p className="card-text text-muted d-lg-block">
                                        Personalized travel planning and services
                                    </p>
                                    <button href="#" className="btn btn-lg orange-btn rounded-pill">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 col-lg-4 my-3">
                            <div className="card text-center">
                                <div className="card-header orange">
                                    <span className="text-light lead">Trailblazer Tier</span>
                                </div>
                                <div className="card-body">
                                    <p className="display-4 my-3 fw-bold">
                                        $5
                                    </p>
                                    <p className="card-text text-muted d-sm-block">
                                        Unlimited Blink to any of our locations
                                    </p>
                                    <p className="card-text text-muted d-lg-block">
                                        Priority access to our all of our services
                                    </p>
                                    <p className="card-text text-muted d-lg-block">
                                        Allows user to create 3 private terminals
                                    </p>
                                    <button href="#" className="btn btn-lg orange-btn rounded-pill">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="text-center">
                        <p className="lead text-muted">
                            Please ensure your payment information is up to date to avoid any
                            interruptions of our services. You can manage your subscription
                            and billing details through your Blinkdashboards.
                        </p>
                    </div>
                </div>
            </section>

            {/* accordion */}
            <section id="faq">
                <div className="container-lg ">
                    <div className="text-center">
                        <h2 className="section-title">FAQ</h2>
                        <p className="lead section-subtitle">Want to Know More?</p>
                    </div>
                    <div className="accordion my-5" id="chapters">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="heading-1">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#chapter-1"
                                    aria-expanded="true" aria-controls="chapter-1">
                                    What makes Rover different from other social media platforms?
                                </button>
                            </h2>
                            <div id="chapter-1" className="accordion-collapse collapse show" aria-labelledby="heading-1"
                                data-bs-parent="#chapters">
                                <div className="accordion-body">
                                    <p>Rover is designed specifically for travelers! In addition to classic social media features like posting updates and messaging, each user has an interactive globe on their profile where they can highlight the countries they have visited, making it a fun and personalized way to showcase your travels!</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="heading-2">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#chapter-2" aria-expanded="false" aria-controls="chapter-2">
                                    Is Rover free to use?
                                </button>
                            </h2>
                            <div id="chapter-2" className="accordion-collapse collapse" aria-labelledby="heading-2"
                                data-bs-parent="#chapters">
                                <div className="accordion-body">
                                    <p>Yes, Rover is completely free to join and use!</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="heading-3">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#chapter-3" aria-expanded="false" aria-controls="chapter-1">
                                    What languages is Rover available in?
                                </button>
                            </h2>
                            <div id="chapter-3" className="accordion-collapse collapse" aria-labelledby="heading-3"
                                data-bs-parent="#chapters">
                                <div className="accordion-body">
                                    <p>Currently, Rover is only available in English, Spanish, French, Japanese and Italian. But we plan to support for more languages like german, chinese, portuguese and korean in the future so that travelers all over the world can share their stories.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="heading-4">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#chapter-4" aria-expanded="false" aria-controls="chapter-4">
                                    How do I connect with other travelers?
                                </button>
                            </h2>
                            <div id="chapter-4" className="accordion-collapse collapse" aria-labelledby="heading-4"
                                data-bs-parent="#chapters">
                                <div className="accordion-body">
                                    <p> Search for users, join groups, or participate in discussions to connect with fellow adventurers.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage