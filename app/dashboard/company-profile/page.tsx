import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile } from "@/services/company/getProfile";
import { PastPerformanceEntry } from "@/types/company";

function toLabel(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());
}

function toText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}

function details(entry: PastPerformanceEntry): Array<[string, unknown]> {
  return Object.entries(entry).filter(([key]) => !["client", "project", "outcome", "year"].includes(key));
}

export default async function CompanyProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">No company profile found for your organization yet.</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="mb-2 text-sm font-semibold">Capabilities</h3>
          {profile.capabilities.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {profile.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No capabilities listed.</p>
          )}
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold">Certifications</h3>
          {profile.certifications.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {profile.certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No certifications listed.</p>
          )}
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold">Past Performance</h3>
          {profile.pastPerformance.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {profile.pastPerformance.map((item, index) => {
                const extraDetails = details(item);
                return (
                  <Card key={`${profile.id}-${index}`} className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{item.project ?? item.client ?? `Record ${index + 1}`}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      {item.client ? <p><span className="font-medium text-foreground">Client:</span> {item.client}</p> : null}
                      {item.outcome ? <p><span className="font-medium text-foreground">Outcome:</span> {item.outcome}</p> : null}
                      {item.year ? <p><span className="font-medium text-foreground">Year:</span> {item.year}</p> : null}
                      {extraDetails.length > 0 ? (
                        <div className="space-y-1 pt-1">
                          {extraDetails.map(([key, value]) => (
                            <p key={key}>
                              <span className="font-medium text-foreground">{toLabel(key)}:</span> {toText(value)}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No past performance records listed.</p>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
