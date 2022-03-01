import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Title, Layout } from '../../elements';

const Eula = () => {
  const { colors } = useTheme();
  return (
    <Layout>
      <ScrollView style={{ padding: 16 }}>
        <Title style={{ marginBottom: 10 }}>
          End-User License Agreement ("Agreement")
        </Title>
        <Text>
          {`Our EULA was last updated on January 17th, 2022.

Please read this End-User License Agreement carefully before clicking the "I Agree" button, downloading or using YSP Canada.
`}
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Interpretation and Definitions
        </Title>
        <Title size="xsmall" style={{ marginTop: 8, marginBottom: 8 }}>
          Interpretation
        </Title>
        <Text>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </Text>
        <Title size="xsmall" style={{ marginTop: 8, marginBottom: 8 }}>
          Definitions
        </Title>
        <Text>For the purposes of this End-User License Agreement: </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              "Agreement"
            </Text>{' '}
            means this End-User License Agreement that forms the entire
            agreement between You and the Company regarding the use of the
            Application. This EULA was generated by TermsFeed EULA Generator.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              "Application"{' '}
            </Text>
            means the software program provided by the Company downloaded by You
            through an Application Store's account to a Device, named YSP Canada
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              "Application Store"{' '}
            </Text>
            means the digital distribution service operated and developed by
            Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) by
            which the Application has been downloaded to your Device.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              "Company"{' '}
            </Text>
            (referred to as either "the Company", "We", "Us" or "Our" in this
            Agreement) refers to YSP Canada.{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              "Content"{' '}
            </Text>
            refers to content such as text, images, or other information that
            can be posted, uploaded, linked to or otherwise made available by
            You, regardless of the form of that content.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              "Country"{' '}
            </Text>
            refers to: Canada{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              "Device"{' '}
            </Text>
            means any device that can access the Application such as a computer,
            a cellphone or a digital tablet.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              "Family Sharing / Family Group"
            </Text>{' '}
            permits You to share applications downloaded through the Application
            Store with other family members by allowing them to view and
            download each others' eligible Applications to their associated
            Devices.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              "Third-Party Services"{' '}
            </Text>
            means any services or content (including data, information,
            applications and other products services) provided by a third-party
            that may be displayed, included or made available by the
            Application.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>"You" </Text>
            means the individual accessing or using the Application or the
            company, or other legal entity on behalf of which such individual is
            accessing or using the Application, as applicable.
          </Text>
        </View>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Acknowledgment
        </Title>
        <Text>
          {`By clicking the "I Agree" button, downloading or using the Application, You are agreeing to be bound by the terms and conditions of this Agreement. If You do not agree to the terms of this Agreement, do not click on the "I Agree" button, do not download or do not use the Application.

This Agreement is a legal document between You and the Company and it governs your use of the Application made available to You by the Company.

This Agreement is between You and the Company only and not with the Application Store. Therefore, the Company is solely responsible for the Application and its content. Although the Application Store is not a party to this Agreement, it has the right to enforce it against You as a third party beneficiary relating to your use of the Application.

Since the Application can be accessed and used by other users via, for example, Family Sharing / Family Group or volume purchasing, the use of the Application by those users is expressly subject to this Agreement.

The Application is licensed, not sold, to You by the Company for use strictly in accordance with the terms of this Agreement.
`}
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          License
        </Title>
        <Title size="xsmall" style={{ marginTop: 8, marginBottom: 8 }}>
          Scope of License
        </Title>
        <Text>
          {`The Company grants You a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application strictly in accordance with the terms of this Agreement.

You may only use the Application on a Device that You own or control and as permitted by the Application Store's terms and conditions.

The license that is granted to You by the Company is solely for your personal, non-commercial purposes strictly in accordance with the terms of this Agreement.
`}
        </Text>
        <Title size="xsmall" style={{ marginTop: 8, marginBottom: 8 }}>
          License Restrictions
        </Title>
        <Text>You agree not to, and You will not permit others to: </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            License, sell, rent, lease, assign, distribute, transmit, host,
            outsource, disclose or otherwise commercially exploit the
            Application or make the Application available to any third party.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 16
          }}
        >
          <Text>{'\u2022'}</Text>
          <Text style={{ paddingLeft: 5 }}>
            Remove, alter or obscure any proprietary notice (including any
            notice of copyright or trademark) of the Company or its affiliates,
            partners, suppliers or the licensors of the Application.
          </Text>
        </View>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Intellectual Property
        </Title>
        <Text>
          {`The Application, including without limitation all copyrights, patents, trademarks, trade secrets and other intellectual property rights are, and shall remain, the sole and exclusive property of the Company.

The Company shall not be obligated to indemnify or defend You with respect to any third party claim arising out of or relating to the Application. To the extent the Company is required to provide indemnification by applicable law, the Company, not the Application Store, shall be solely responsible for the investigation, defense, settlement and discharge of any claim that the Application or your use of it infringes any third party intellectual property rights.
`}
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Modifications to the Application
        </Title>
        <Text>
          The Company reserves the right to modify, suspend or discontinue,
          temporarily or permanently, the Application or any service to which it
          connects, with or without notice and without liability to You.
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Updates to the Application
        </Title>
        <Text>
          {`The Company may from time to time provide enhancements or improvements to the features/functionality of the Application, which may include patches, bug fixes, updates, upgrades and other modifications.

Updates may modify or delete certain features and/or functionalities of the Application. You agree that the Company has no obligation to (i) provide any Updates, or (ii) continue to provide or enable any particular features and/or functionalities of the Application to You.

You further agree that all updates or any other modifications will be (i) deemed to constitute an integral part of the Application, and (ii) subject to the terms and conditions of this Agreement.
`}
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Maintenance and Support
        </Title>
        <Text>
          The Company does not provide any maintenance or support for the
          download and use of the Application. To the extent that any
          maintenance or support is required by applicable law, the Company, not
          the Application Store, shall be obligated to furnish any such
          maintenance or support.
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Third-Party Services
        </Title>
        <Text>
          {`The Application may display, include or make available third-party content (including data, information, applications and other products services) or provide links to third-party websites or services.

You acknowledge and agree that the Company shall not be responsible for any Third-party Services, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect thereof. The Company does not assume and shall not have any liability or responsibility to You or any other person or entity for any Third-party Services.

You must comply with applicable Third parties' Terms of agreement when using the Application. Third-party Services and links thereto are provided solely as a convenience to You and You access and use them entirely at your own risk and subject to such third parties' Terms and conditions.
`}
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Term and Termination
        </Title>
        <Text>
          {`This Agreement shall remain in effect until terminated by You or the Company. The Company may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.

This Agreement will terminate immediately, without prior notice from the Company, in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the Application and all copies thereof from your Device or from your computer.

Upon termination of this Agreement, You shall cease all use of the Application and delete all copies of the Application from your Device.

Termination of this Agreement will not limit any of the Company's rights or remedies at law or in equity in case of breach by You (during the term of this Agreement) of any of your obligations under the present Agreement.
`}
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Indemnification
        </Title>
        <Text>
          You agree to indemnify and hold the Company and its parents,
          subsidiaries, affiliates, officers, employees, agents, partners and
          licensors (if any) harmless from any claim or demand, including
          reasonable attorneys' fees, due to or arising out of your: (a) use of
          the Application; (b) violation of this Agreement or any law or
          regulation; or (c) violation of any right of a third party.
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          No Warranties
        </Title>
        <Text>
          {`The Application is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Application, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Application will meet your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.

Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Application, or the information, content, and materials or products included thereon; (ii) that the Application will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Application; or (iv) that the Application, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.

Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law. To the extent any warranty exists under law that cannot be disclaimed, the Company, not the Application Store, shall be solely responsible for such warranty.
`}
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Limitation of Liability
        </Title>
        <Text>{`Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Agreement and your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You for the Application or through the Application or 100 USD if You haven't purchased anything through the Application.

To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Application, third-party software and/or third-party hardware used with the Application, or otherwise in connection with any provision of this Agreement), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.

Some states/jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to You.

You expressly understand and agree that the Application Store, its subsidiaries and affiliates, and its licensors shall not be liable to You under any theory of liability for any direct, indirect, incidental, special consequential or exemplary damages that may be incurred by You, including any loss of data, whether or not the Application Store or its representatives have been advised of or should have been aware of the possibility of any such losses arising.
`}</Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Severability and Waiver{' '}
        </Title>
        <Title size="xsmall" style={{ marginTop: 8, marginBottom: 8 }}>
          Severability
        </Title>
        <Text>
          If any provision of this Agreement is held to be unenforceable or
          invalid, such provision will be changed and interpreted to accomplish
          the objectives of such provision to the greatest extent possible under
          applicable law and the remaining provisions will continue in full
          force and effect.
        </Text>
        <Title size="xsmall" style={{ marginTop: 8, marginBottom: 8 }}>
          Waiver
        </Title>
        <Text>
          Except as provided herein, the failure to exercise a right or to
          require performance of an obligation under this Agreement shall not
          effect a party's ability to exercise such right or require such
          performance at any time thereafter nor shall the waiver of a breach
          constitute a waiver of any subsequent breach.
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Product Claims
        </Title>
        <Text>
          The Company does not make any warranties concerning the Application.
          To the extent You have any claim arising from or relating to your use
          of the Application, the Company, not the Application Store, is
          responsible for addressing any such claims, which may include, but not
          limited to: (i) any product liability claims; (ii) any claim that the
          Application fails to conform to any applicable legal or regulatory
          requirement; and (iii) any claim arising under consumer protection, or
          similar legislation.
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          United States Legal Compliance
        </Title>
        <Text>
          You represent and warrant that (i) You are not located in a country
          that is subject to the United States government embargo, or that has
          been designated by the United States government as a "terrorist
          supporting" country, and (ii) You are not listed on any United States
          government list of prohibited or restricted parties.
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Changes to this Agreement
        </Title>
        <Text>
          The Company reserves the right, at its sole discretion, to modify or
          replace this Agreement at any time. If a revision is material we will
          provide at least 30 days' notice prior to any new terms taking effect.
          What constitutes a material change will be determined at the sole
          discretion of the Company. By continuing to access or use the
          Application after any revisions become effective, You agree to be
          bound by the revised terms. If You do not agree to the new terms, You
          are no longer authorized to use the Application.
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Governing Law
        </Title>
        <Text>
          The laws of the Country, excluding its conflicts of law rules, shall
          govern this Agreement and your use of the Application. Your use of the
          Application may also be subject to other local, state, national, or
          international laws.
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Entire Agreement
        </Title>
        <Text>
          The Agreement constitutes the entire agreement between You and the
          Company regarding your use of the Application and supersedes all prior
          and contemporaneous written or oral agreements between You and the
          Company.
          {`
      `}
        </Text>
        <Text>
          You may be subject to additional terms and conditions that apply when
          You use or purchase other Company's services, which the Company will
          provide to You at the time of such use or purchase.
        </Text>
        <Title size="small" style={{ marginTop: 10, marginBottom: 10 }}>
          Contact Us
        </Title>
        <Text>
          If you have any questions about this Agreement, You can contact Us:
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Text>{'\u2022'}</Text>
          <Text style={{ flex: 1, paddingLeft: 5 }}>
            By sending us an email:
          </Text>
        </View>
        <Text
          style={{
            marginBottom: 100,
            color: colors.p1,
            fontWeight: 'bold',
            marginLeft: 12
          }}
          selectable={true}
        >
          teresa.s.lacroix@gmail.com.
        </Text>
      </ScrollView>
    </Layout>
  );
};

export default Eula;
