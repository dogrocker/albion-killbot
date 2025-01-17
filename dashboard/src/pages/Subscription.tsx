import Loader from "components/Loader";
import SubscriptionAssign from "components/SubscriptionAssign";
import SubscriptionPriceCard from "components/SubscriptionPriceCard";
import { useState } from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  useFetchServerQuery,
  useFetchUserQuery,
  useManageSubscriptionMutation,
} from "store/api";
import { Subscription } from "types";

const SubscriptionPage = () => {
  const { serverId = "" } = useParams();
  const user = useFetchUserQuery();
  const server = useFetchServerQuery(serverId);
  const [subscriptionAssignId, setSubscriptionAssignId] = useState("");
  const [dispatchManageSubscription, manageSubscription] =
    useManageSubscriptionMutation();

  if (server.isFetching) return <Loader />;
  if (manageSubscription.isLoading) return <Loader />;
  if (manageSubscription.isSuccess && manageSubscription.data) {
    window.location.href = manageSubscription.data.url;
  }

  const renderServerSubscription = (subscription?: Subscription) => {
    const isSubscriptionOwner =
      subscription?.owner === user.data?.id || user.data?.admin;

    return (
      <div>
        <Card className="d-flex justify-content-start p-2">
          {subscription ? (
            <div>
              <span>Server Status: </span>
              <span className="text-primary">
                {subscription.expires === "never"
                  ? `Activated`
                  : `${
                      new Date(subscription.expires).getTime() >
                      new Date().getTime()
                        ? `Active until `
                        : `Expired at `
                    } ${new Date(subscription.expires).toLocaleString()}`}
              </span>
            </div>
          ) : (
            <div>
              This server doesn't have an active subscription. Please, go to{" "}
              <Link to="/premium">Premium</Link> page to assign a subscription.
            </div>
          )}
        </Card>
        {subscription?.stripe && subscription.stripe?.price && (
          <Row className="justify-content-center my-3">
            <Col lg={6}>
              <SubscriptionPriceCard price={subscription.stripe?.price}>
                <Stack gap={2} className="p-2">
                  <div className="id-text">
                    <span>#{subscription.id}</span>
                    {subscription.stripe?.cancel_at_period_end && (
                      <span className="cancelled-text">cancelled</span>
                    )}
                  </div>
                  {isSubscriptionOwner && (
                    <Stack gap={2}>
                      <Button
                        variant="secondary"
                        onClick={() => setSubscriptionAssignId(subscription.id)}
                      >
                        Transfer
                      </Button>

                      {subscription.stripe?.customer && (
                        <Button
                          variant="danger"
                          onClick={() => {
                            if (subscription.stripe?.customer)
                              dispatchManageSubscription(
                                subscription.stripe.customer
                              );
                          }}
                        >
                          {subscription.stripe?.cancel_at_period_end
                            ? "Renew"
                            : "Cancel"}
                        </Button>
                      )}
                    </Stack>
                  )}
                </Stack>
              </SubscriptionPriceCard>
            </Col>
          </Row>
        )}
      </div>
    );
  };

  return (
    <>
      {!server.data && <div>No data found.</div>}
      {renderServerSubscription(server.data?.subscription)}
      {subscriptionAssignId && (
        <SubscriptionAssign
          currentServerId={serverId}
          subscriptionId={subscriptionAssignId}
          onClose={() => setSubscriptionAssignId("")}
        />
      )}
    </>
  );
};

export default SubscriptionPage;
